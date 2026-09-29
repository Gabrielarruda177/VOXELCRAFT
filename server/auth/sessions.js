/**
 * Sessões por token opaco.
 *
 * O token que o cliente envia é aleatório (256 bits). No banco guardamos só o
 * SHA-256 dele: se alguém dumpar o banco, os hashes não servem para forjar
 * sessão, porque não são o valor que o navegador tem.
 */

import { createHash, randomBytes } from 'node:crypto';
import { getPool, config } from '../db/pool.js';

const TOKEN_BYTES = 32; // 256 bits

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Cria uma sessão e devolve o token em texto puro (única vez que ele existe
 * fora do navegador do cliente).
 * @returns {Promise<{token: string, expiresAt: Date}>}
 */
export async function createSession(userId) {
  const token = randomBytes(TOKEN_BYTES).toString('base64url');
  const expiresAt = new Date(Date.now() + config.sessionDays * 86400_000);

  await getPool().execute(
    'INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)',
    [hashToken(token), userId, expiresAt],
  );

  return { token, expiresAt };
}

/**
 * Valida um token e devolve o usuário, ou null.
 * Também renova `last_seen_at`, o que dá de graça a expiração deslizante e
 * um indicador de "quem está online" para o endpoint /api/auth/me.
 *
 * @param {string} token
 * @returns {Promise<{id: number, username: string, created_at: string}|null>}
 */
export async function resolveSession(token) {
  if (typeof token !== 'string' || token.length < 16 || token.length > 200) return null;

  const tokenHash = hashToken(token);
  const [rows] = await getPool().execute(
    `SELECT u.id, u.username, u.created_at, s.expires_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ?
      LIMIT 1`,
    [tokenHash],
  );

  if (rows.length === 0) return null;

  const row = rows[0];
  const expires = new Date(row.expires_at);
  if (Number.isNaN(expires.getTime()) || expires.getTime() <= Date.now()) {
    await getPool().execute('DELETE FROM sessions WHERE token_hash = ?', [tokenHash]);
    return null;
  }

  // Expiração deslizante: 10% do tempo total, no máximo 1 dia por chamada.
  const lifetime = config.sessionDays * 86400_000;
  const bumpMs = Math.min(lifetime * 0.1, 86400_000);
  const nextExpiry = new Date(Math.min(expires.getTime() + bumpMs, Date.now() + lifetime));
  await getPool().execute(
    'UPDATE sessions SET last_seen_at = NOW(), expires_at = ? WHERE token_hash = ?',
    [nextExpiry, tokenHash],
  );

  return { id: row.id, username: row.username, createdAt: row.created_at };
}

export async function destroySession(token) {
  if (typeof token !== 'string' || token.length < 16) return;
  await getPool().execute('DELETE FROM sessions WHERE token_hash = ?', [hashToken(token)]);
}

/** Remove sessões vencidas. Chame periodicamente do servidor. */
export async function pruneExpiredSessions() {
  const [result] = await getPool().execute('DELETE FROM sessions WHERE expires_at <= NOW()');
  return result.affectedRows ?? 0;
}

/** Lê o token do cabeçalho Authorization ou do cookie de fallback. */
export function extractToken(req) {
  const header = req.get('authorization');
  if (header) {
    const match = /^Bearer\s+(.+)$/i.exec(header.trim());
    if (match) return match[1].trim();
  }
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  for (const part of cookie.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === 'vc_token') return decodeURIComponent(rest.join('='));
  }
  return null;
}
