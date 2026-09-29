/**
 * Pool de conexões MySQL e leitura de configuração.
 *
 * Toda a configuração vem do ambiente (arquivo .env ou variáveis reais), para
 * que nenhuma credencial fique escrita no código.
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

const HERE = dirname(fileURLToPath(import.meta.url));
export const SERVER_ROOT = resolve(HERE, '..');
export const PROJECT_ROOT = resolve(SERVER_ROOT, '..');

/**
 * Carrega o .env sem dependência externa.
 * Linhas no formato CHAVE=valor, # comenta, aspas simples e duplas são removidas.
 */
function loadDotEnv() {
  const path = join(SERVER_ROOT, '.env');
  if (!existsSync(path)) return;

  for (const rawLine of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // O .env não sobrescreve variáveis já definidas no ambiente real.
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv();

function int(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const config = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: int('DB_PORT', 3306),
  user: process.env.DB_USER || 'voxelcraft',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME || 'voxelcraft',
  connectionLimit: int('DB_POOL_SIZE', 10),
  port_http: int('PORT', 3001),
  sessionDays: int('SESSION_DAYS', 30),
  worldgenVersion: int('WORLDGEN_VERSION', 1),
};

/**
 * @param {object} [opts] sobrescritas pontuais (usado pela migração, que
 *                      precisa falar com o servidor antes do banco existir).
 */
export function createPool(opts = {}) {
  return mysql.createPool({
    host: opts.host ?? config.host,
    port: opts.port ?? config.port,
    user: opts.user ?? config.user,
    password: opts.password ?? config.password,
    database: opts.database ?? config.database,
    waitForConnections: true,
    connectionLimit: opts.connectionLimit ?? config.connectionLimit,
    queueLimit: 0,
    // A tabela worlds e friends usam ENUM/JSON; sem isto o mysql2 devolve
    // strings e os valores enum viram números soltos.
    dateStrings: true,
    charset: 'utf8mb4_unicode_ci',
    multipleStatements: false,
  });
}

/** Pool preguiçoso: só abre conexão quando alguém realmente precisar. */
let pool = null;
export function getPool() {
  if (pool === null) pool = createPool();
  return pool;
}

export async function closePool() {
  if (pool === null) return;
  await pool.end();
  pool = null;
}

/** Verifica a conexão e devolve a versão do servidor. */
export async function ping() {
  const [rows] = await getPool().query('SELECT VERSION() AS version, DATABASE() AS db');
  return rows[0];
}
