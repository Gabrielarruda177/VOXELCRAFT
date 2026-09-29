/**
 * Rotas de conta: registro, login, sessão atual e logout.
 */

import { Router } from 'express';
import { getPool } from '../db/pool.js';
import { hashPassword, validatePassword, verifyPassword } from '../auth/passwords.js';
import { createSession, destroySession } from '../auth/sessions.js';
import { HttpError, badRequest, conflict, requireAuth, unauthorized } from '../middleware.js';

export const authRouter = Router();

const USERNAME_RE = /^[A-Za-z0-9_.-]{3,32}$/;
const USERNAME_MIN = 3;
const USERNAME_MAX = 32;

// Hash descartável, só para igualizar o tempo de resposta quando o usuário não
// existe. Não protege nada sozinho; apenas evita que o tempo de resposta revele
// quais nomes de usuário estão cadastrados.
const DUMMY_HASH =
  'scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA$' +
  'ZG9udC1tYXRjaC1hbnktc2FsdC1wYWRkaW5nLXBsYWNlaG9sZGVyLWhlcmU=';

/** Chave de normalização para login sem diferenciar maiúsculas. */
const normalize = (name) => name.trim().toLowerCase();

function validateUsername(raw) {
  if (typeof raw !== 'string') return 'Informe um nome de usuário.';
  const trimmed = raw.trim();
  if (trimmed.length < USERNAME_MIN) return `O nome precisa ter ao menos ${USERNAME_MIN} caracteres.`;
  if (trimmed.length > USERNAME_MAX) return `O nome pode ter no máximo ${USERNAME_MAX} caracteres.`;
  if (!USERNAME_RE.test(trimmed)) {
    return 'Use apenas letras, números, ponto, hífen ou underscore.';
  }
  return null;
}

/** POST /api/auth/register */
authRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body ?? {};

    const nameError = validateUsername(username);
    if (nameError) throw badRequest(nameError);

    const passError = validatePassword(password);
    if (passError) throw badRequest(passError);

    const clean = username.trim();
    const passwordHash = await hashPassword(password);

    let userId;
    try {
      const [result] = await getPool().execute(
        'INSERT INTO users (username, username_ci, password_hash) VALUES (?, ?, ?)',
        [clean, normalize(clean), passwordHash],
      );
      userId = result.insertId;
    } catch (err) {
      // 1062 = chave duplicada. Traduzimos para "nome já existe" em vez de
      // vazar um erro de driver para o cliente.
      if (err && err.code === 'ER_DUP_ENTRY') throw conflict('Esse nome de usuário já existe.');
      throw err;
    }

    const [{ token, expiresAt }] = await Promise.all([
      createSession(userId),
      getPool().execute(
        'INSERT INTO user_settings (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = user_id',
        [userId],
      ),
    ]);

    res.status(201).json({
      token,
      expiresAt,
      user: { id: userId, username: clean },
    });
  } catch (err) {
    next(err);
  }
});

/** POST /api/auth/login */
authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body ?? {};

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw badRequest('Informe usuário e senha.');
    }

    const [rows] = await getPool().execute(
      'SELECT id, username, password_hash FROM users WHERE username_ci = ? LIMIT 1',
      [normalize(username)],
    );

    if (rows.length === 0) {
      // Verificamos contra um hash descartável para que um usuário inexistente
      // e uma senha errada levem o mesmo tempo — sem vazar quais nomes existem.
      await verifyPassword(password, DUMMY_HASH);
      throw unauthorized('Usuário ou senha incorretos.');
    }

    const user = rows[0];
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) throw unauthorized('Usuário ou senha incorretos.');

    await getPool().execute('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);
    const { token, expiresAt } = await createSession(user.id);

    res.json({
      token,
      expiresAt,
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    next(err);
  }
});

/** GET /api/auth/me — usado pelo cliente para validar o token guardado. */
authRouter.get('/me', requireAuth, (req, res) => {
  res.json({ user: { id: req.user.id, username: req.user.username, createdAt: req.user.createdAt } });
});

/** POST /api/auth/logout */
authRouter.post('/logout', requireAuth, async (req, res, next) => {
  try {
    await destroySession(req.token);
    res.json({ ok: true });
  } catch (err) {
    next(err instanceof HttpError ? err : new HttpError(500, 'Falha ao encerrar a sessão.'));
  }
});
