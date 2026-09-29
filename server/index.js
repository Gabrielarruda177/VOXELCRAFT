/**
 * Servidor HTTP do VoxelCraft.
 *
 *   node server/index.js          (ou `npm run server`)
 *
 * Responsável por: autenticação, e persistir o estado do jogador, o inventário,
 * o diff de blocos do mundo e os contêineres no MySQL.
 *
 * O jogo roda 100% no navegador; este servidor existe só para que o progresso
 * sobreviva ao F5 e possa ser lido de outra máquina.
 */

import express from 'express';
import { config, closePool, ping } from './db/pool.js';
import { authRouter } from './routes/auth.routes.js';
import { worldRouter } from './routes/world.routes.js';
import { settingsRouter } from './routes/settings.routes.js';
import { HttpError, jsonBody, rateLimit } from './middleware.js';
import { pruneExpiredSessions } from './auth/sessions.js';

const app = express();

app.disable('x-powered-by');
// O Vite serve o cliente em outra porta durante o desenvolvimento, então
// precisamos de CORS. `credentials` fica desligado de propósito: a sessão vai
// no cabeçalho Authorization, não em cookie, o que dispensa CSRF por construção.
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Max-Age', '600');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(jsonBody('12mb'));

// ── Saúde ──────────────────────────────────────────────────────────────────

app.get('/api/health', async (_req, res) => {
  try {
    const info = await ping();
    res.json({
      ok: true,
      service: 'voxelcraft-server',
      mysql: { version: info.version, database: info.db },
      worldgenVersion: config.worldgenVersion,
    });
  } catch (err) {
    res.status(503).json({ ok: false, error: 'MySQL inacessível.', detail: err.message });
  }
});

// ── Rotas ──────────────────────────────────────────────────────────────────

const authLimit = rateLimit({ windowMs: 60_000, max: 20, message: 'Muitas tentativas. Espere um minuto.' });
app.use('/api/auth', authLimit, authRouter);
app.use('/api/worlds', rateLimit({ windowMs: 60_000, max: 600 }), worldRouter);
app.use('/api/settings', rateLimit({ windowMs: 60_000, max: 120 }), settingsRouter);

// ── Erros ──────────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// eslint-disable-next-line no-unused-vars -- Express identifica o handler de
// erro pela aridade de 4; remover o parâmetro `next` quebraria isso.
app.use((err, _req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }

  // Erro de JSON malformado vem do body-parser.
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido no corpo da requisição.' });
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Corpo da requisição grande demais.' });
  }

  console.error('[server] erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

// ── Boot ───────────────────────────────────────────────────────────────────

const server = app.listen(config.port_http, () => {
  console.log(`[server] VoxelCraft API em http://localhost:${config.port_http}`);
  console.log(`[server] MySQL ${config.host}:${config.port}/${config.database} (usuário ${config.user})`);
  console.log(`[server] worldgen_version=${config.worldgenVersion}, sessões=${config.sessionDays}d`);
});

// Limpeza de sessões vencidas a cada 6 horas.
const pruneTimer = setInterval(() => {
  pruneSessionSweep().catch((err) => console.warn('[server] falha na limpeza de sessões:', err.message));
}, 6 * 3600_000);
pruneTimer.unref?.();

async function pruneSessionSweep() {
  const removed = await pruneExpiredSessions();
  if (removed > 0) console.log(`[server] ${removed} sessões vencidas removidas`);
}

async function shutdown(signal) {
  console.log(`\n[server] ${signal} recebido, encerrando...`);
  server.close();
  try {
    await closePool();
  } catch (err) {
    console.warn('[server] erro ao fechar o pool:', err.message);
  }
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Se o MySQL cair no boot, avisa com clareza em vez de estourar um stack trace.
try {
  const info = await ping();
  console.log(`[server] MySQL ${info.version} conectado`);
} catch (err) {
  console.error('[server] não foi possível conectar ao MySQL:', err.message);
  console.error('[server] verifique o Laragon (porta 3306) e o server/.env');
}
