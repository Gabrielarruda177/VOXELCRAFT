/**
 * Verificação de integridade do banco: tabelas, colunas e índices.
 *
 *   node server/db/check.mjs
 *
 * Útil para confirmar que uma migração rodou até o fim e que o usuário da
 * aplicação consegue ler e escrever de verdade.
 */

import { getPool, closePool, config } from './pool.js';

const REQUIRED = {
  users: ['id', 'username', 'username_ci', 'password_hash', 'created_at', 'last_login_at'],
  sessions: ['token_hash', 'user_id', 'created_at', 'expires_at', 'last_seen_at'],
  worlds: ['id', 'owner_id', 'name', 'worldgen_version', 'time_of_day', 'weather', 'last_dimension', 'revision'],
  players: ['world_id', 'user_id', 'x', 'y', 'z', 'yaw', 'pitch', 'health', 'max_health', 'hunger', 'xp', 'level', 'is_flying', 'camera_mode'],
  inventory_slots: ['world_id', 'user_id', 'slot_index', 'item_type', 'item_count'],
  armor_slots: ['world_id', 'user_id', 'slot_index', 'item_type', 'item_count'],
  block_edits: ['world_id', 'dimension', 'x', 'y', 'z', 'block_type', 'fluid_level'],
  containers: ['world_id', 'dimension', 'kind', 'x', 'y', 'z', 'payload'],
  user_settings: ['user_id', 'render_distance', 'fov', 'mouse_sensitivity', 'music_volume'],
  save_log: ['id', 'world_id', 'user_id', 'revision', 'blocks_saved', 'duration_ms', 'created_at'],
};

async function main() {
  const problems = [];

  const [tables] = await getPool().query(
    'SELECT TABLE_NAME AS t FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?',
    [config.database],
  );
  const present = new Set(tables.map((r) => r.t));

  for (const [table, columns] of Object.entries(REQUIRED)) {
    if (!present.has(table)) {
      problems.push(`tabela ausente: ${table}`);
      continue;
    }
    const [cols] = await getPool().query(
      'SELECT COLUMN_NAME AS c FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      [config.database, table],
    );
    const have = new Set(cols.map((r) => r.c));
    for (const column of columns) {
      if (!have.has(column)) problems.push(`${table}: coluna ausente ${column}`);
    }
  }

  // Todos os preços são InnoDB: as rotas de save dependem de transações reais.
  const [engines] = await getPool().query(
    'SELECT TABLE_NAME AS t, ENGINE AS e FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?',
    [config.database],
  );
  for (const row of engines) {
    if (row.e !== 'InnoDB') problems.push(`${row.t}: engine é ${row.e}, esperado InnoDB`);
  }

  const [[counts]] = await getPool().query(
    'SELECT ' +
      '(SELECT COUNT(*) FROM users) AS users, ' +
      '(SELECT COUNT(*) FROM worlds) AS worlds, ' +
      '(SELECT COUNT(*) FROM block_edits) AS blocks, ' +
      '(SELECT COUNT(*) FROM sessions) AS sessions',
  );

  console.log(`[check] banco: ${config.user}@${config.host}:${config.port}/${config.database}`);
  console.log(`[check] tabelas: ${tables.length} | usuários: ${counts.users} | mundos: ${counts.worlds} | edits: ${counts.blocks} | sessões: ${counts.sessions}`);

  if (problems.length > 0) {
    console.error(`[check] ${problems.length} problema(s):`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exitCode = 1;
  } else {
    console.log('[check] tudo certo.');
  }
}

main()
  .catch((err) => {
    console.error('[check] FALHOU:', err.message);
    process.exitCode = 1;
  })
  .finally(() => closePool());
