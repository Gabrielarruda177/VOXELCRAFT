/**
 * Migração: cria o database, o usuário da aplicação e aplica schema.sql.
 *
 *   node server/db/migrate.mjs
 *
 * Conecta com DB_ADMIN_USER/DB_ADMIN_PASSWORD (padrão: root sem senha, que é o
 * padrão do Laragon). O usuário da aplicação é criado só se ainda não existir,
 * e a senha nunca é impressa: ela fica em server/.env, que é ignorado pelo git.
 */

import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import mysql from 'mysql2/promise';
import { SERVER_ROOT } from './pool.js';

const ADMIN_USER = process.env.DB_ADMIN_USER || 'root';
const ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD ?? '';
const APP_DB = process.env.DB_NAME || 'voxelcraft';
const APP_USER = process.env.DB_USER || 'voxelcraft';
const HOST = process.env.DB_HOST || '127.0.0.1';
const PORT = Number.parseInt(process.env.DB_PORT || '3306', 10);

function log(msg) {
  console.log(`[migrate] ${msg}`);
}

/**
 * Divide o SQL em comandos, ignorando `;` que estejam dentro de comentários ou
 * de strings.Um split ingênuo por `;` quebra assim que alguém escreve
 * "-- mundo; no jogo single-player" numa linha de comentário.
 */
function splitStatements(sql) {
  const statements = [];
  let current = '';
  let inLineComment = false;
  let inBlockComment = false;
  let quote = null; // ', " ou `

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const next = sql[i + 1];

    if (inLineComment) {
      if (ch === '\n') {
        inLineComment = false;
        current += ch;
      }
      continue; // a linha de comentário inteira é descartada
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (quote) {
      current += ch;
      if (ch === '\\' && quote !== '`') {
        current += next ?? '';
        i++;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }

    if (ch === '-' && next === '-') {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === '#') {
      inLineComment = true;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      current += ch;
      continue;
    }

    if (ch === ';') {
      const trimmed = current.trim();
      if (trimmed.length > 0) statements.push(trimmed);
      current = '';
      continue;
    }

    current += ch;
  }

  const tail = current.trim();
  if (tail.length > 0) statements.push(tail);
  return statements;
}

async function main() {
  const admin = await mysql.createConnection({
    host: HOST,
    port: PORT,
    user: ADMIN_USER,
    password: ADMIN_PASSWORD,
    multipleStatements: true,
  });

  try {
    // ── 1. Banco ────────────────────────────────────────────────────────────
    await admin.query(
      `CREATE DATABASE IF NOT EXISTS \`${APP_DB}\` ` +
        'DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci',
    );
    log(`database \`${APP_DB}\` pronto`);

    // ── 2. Usuário da aplicação ─────────────────────────────────────────────
    // Lê a senha do .env; se ainda não existir, gera uma forte e grava o
    // arquivo, para que `npm run server` funcione sem configuração manual.
    const envPath = join(SERVER_ROOT, '.env');
    let appPassword = process.env.DB_PASSWORD;
    let createdEnv = false;

    if (!appPassword) {
      if (existsSync(envPath)) {
        const match = readFileSync(envPath, 'utf8').match(/^DB_PASSWORD=(.*)$/m);
        if (match) appPassword = match[1].trim().replace(/^["']|["']$/g, '');
      }
    }

    if (!appPassword) {
      appPassword = randomBytes(24).toString('base64url');
      createdEnv = true;
    }

    // O usuário só pode acessar este banco, e a senha nunca é logged.
    // O host é literal (não um placeholder), por isso a string fecha logo
    // depois de @: o par de aspas simples é o delimitador do host.
    const hostLiteral = `'localhost'`;
    for (const host of [hostLiteral, `'127.0.0.1'`]) {
      await admin.query(
        `CREATE USER IF NOT EXISTS '${APP_USER}'@${host} IDENTIFIED BY '${appPassword}'`,
      );
      await admin.query(
        `GRANT ALL PRIVILEGES ON \`${APP_DB}\`.* TO '${APP_USER}'@${host}`,
      );
    }
    log(`usuário '${APP_USER}' pronto (senha fora do log)`);

    if (createdEnv) {
      writeFileSync(
        envPath,
        [
          '# Configuração do servidor VoxelCraft.',
          '# Gerado por server/db/migrate.mjs — NÃO versionar (está no .gitignore).',
          '',
          `DB_HOST=${HOST}`,
          `DB_PORT=${PORT}`,
          `DB_NAME=${APP_DB}`,
          `DB_USER=${APP_USER}`,
          `DB_PASSWORD=${appPassword}`,
          '',
          'PORT=3001',
          'SESSION_DAYS=30',
          'WORLDGEN_VERSION=1',
          '',
        ].join('\n'),
        'utf8',
      );
      log('server/.env criado com uma senha gerada');
    }

    // ── 3. Schema ───────────────────────────────────────────────────────────
    const schemaPath = join(SERVER_ROOT, 'schema.sql');
    if (!existsSync(schemaPath)) throw new Error(`schema.sql não encontrado em ${schemaPath}`);

    // O schema controla qual usuário usa, então removemos o @localhost para
    // casar com quem realmente vai conectar.
    const raw = readFileSync(schemaPath, 'utf8');
    const statements = splitStatements(raw);
    log(`aplicando ${statements.length} comandos de schema.sql`);

    await admin.changeUser({ database: APP_DB });
    for (const statement of statements) {
      try {
        await admin.query(statement);
      } catch (err) {
        // Sem nomes reservados: qualquer falha de sintaxe é um erro nosso.
        const snippet = statement.replace(/\s+/g, ' ').slice(0, 90);
        throw new Error(`falha em: ${snippet}\n  -> ${err.message}`);
      }
    }

    const [tables] = await admin.query(
      'SELECT TABLE_NAME AS t, TABLE_ROWS AS rows_est FROM information_schema.TABLES ' +
        `WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME`,
      [APP_DB],
    );
    log(`tabelas criadas: ${tables.length}`);
    for (const row of tables) log(`  - ${row.t}`);

    log('migração concluída');
  } finally {
    await admin.end();
  }
}

main().catch((err) => {
  console.error('[migrate] FALHOU:', err.message);
  process.exitCode = 1;
});
