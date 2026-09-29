/**
 * Rotas de mundo: estado do jogador, inventário, diff de blocos e contêineres.
 *
 * Princípio central — o mundo NUNCA é enviado em bloco cheio. O terreno é
 * procedural e determinístico, então o servidor guarda só o que mudou
 * (tabela block_edits). Um chunk são 32 KB; salvar 49 chunks daria 1,5 MB por
 * save e o diff de um jogador que cavou 5.000 blocos cabe em algumas dezenas
 * de KB.
 */

import { Router } from 'express';
import { getPool, config } from '../db/pool.js';
import {
  badRequest, conflict, notFound, requireAuth, tooLarge,
} from '../middleware.js';

export const worldRouter = Router();
worldRouter.use(requireAuth);

const CHUNK_HEIGHT = 64;
const MAX_BLOCKS_PER_REQUEST = 20_000;
const MAX_CONTAINERS_PER_REQUEST = 500;
const BLOCK_INSERT_CHUNK = 4_000; // 7 colunas x 4.000 = 28.000 placeholders
const VALID_DIMENSIONS = new Set(['overworld', 'nether']);
const VALID_CONTAINER_KINDS = new Set(['chest', 'furnace']);

// ── Helpers ────────────────────────────────────────────────────────────────

/** Carrega o mundo e confirma que o usuário é dono. */
async function loadOwnedWorld(worldId, userId) {
  const [rows] = await getPool().execute(
    'SELECT id, name, worldgen_version, time_of_day, weather, last_dimension, revision ' +
      'FROM worlds WHERE id = ? AND owner_id = ? LIMIT 1',
    [worldId, userId],
  );
  if (rows.length === 0) throw notFound('Mundo não encontrado.');
  return rows[0];
}

function toInt(value, name, { min = -Infinity, max = Infinity } = {}) {
  const n = Number(value);
  if (!Number.isInteger(n)) throw badRequest(`"${name}" precisa ser um inteiro.`);
  if (n < min || n > max) throw badRequest(`"${name}" fora do intervalo permitido.`);
  return n;
}

function toFloat(value, name, { min = -Infinity, max = Infinity } = {}) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw badRequest(`"${name}" precisa ser um número.`);
  if (n < min || n > max) throw badRequest(`"${name}" fora do intervalo permitido.`);
  return n;
}

function dimensionOf(value) {
  const dim = value ?? 'overworld';
  if (typeof dim !== 'string' || !VALID_DIMENSIONS.has(dim)) {
    throw badRequest(`Dimensão inválida: use ${[...VALID_DIMENSIONS].join(' ou ')}.`);
  }
  return dim;
}

/** Item canônico do jogo: { type, count }. */
function normalizeItem(raw, name) {
  if (raw == null) return { type: 0, count: 0 };
  const type = toInt(raw.type ?? 0, `${name}.type`, { min: 0, max: 65535 });
  const count = toInt(raw.count ?? 0, `${name}.count`, { min: 0, max: 65535 });
  if (count > 0 && type === 0) throw badRequest(`${name}: um item com quantidade precisa ter tipo.`);
  return { type, count };
}

// ── Lista e criação de mundos ──────────────────────────────────────────────

/** GET /api/worlds */
worldRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await getPool().execute(
      `SELECT w.id, w.name, w.worldgen_version, w.last_dimension, w.revision,
              w.updated_at,
              (SELECT COUNT(*) FROM block_edits b WHERE b.world_id = w.id) AS block_edits
         FROM worlds w
        WHERE w.owner_id = ?
        ORDER BY w.updated_at DESC`,
      [req.user.id],
    );

    res.json({
      worlds: rows.map((r) => ({
        id: r.id,
        name: r.name,
        worldgenVersion: r.worldgen_version,
        lastDimension: r.last_dimension,
        revision: r.revision,
        blockEdits: Number(r.block_edits),
        updatedAt: r.updated_at,
        // Sinaliza incompatibilidade sem travar: o cliente pode oferecer
        // regerar o mundo em vez de perder o save silenciosamente.
        compatible: r.worldgen_version === config.worldgenVersion,
      })),
      serverWorldgenVersion: config.worldgenVersion,
    });
  } catch (err) {
    next(err);
  }
});

/** POST /api/worlds — cria um mundo novo, já com o estado inicial do jogador. */
worldRouter.post('/', async (req, res, next) => {
  try {
    const name = typeof req.body?.name === 'string' && req.body.name.trim()
      ? req.body.name.trim().slice(0, 64)
      : 'Meu Mundo';

    const conn = await getPool().getConnection();
    try {
      await conn.beginTransaction();

      const [result] = await conn.execute(
        'INSERT INTO worlds (owner_id, name, worldgen_version) VALUES (?, ?, ?)',
        [req.user.id, name, config.worldgenVersion],
      );
      const worldId = result.insertId;

      // O estado inicial do jogador é gravado pelo cliente no primeiro save;
      // criamos a linha agora para que /api/worlds/:id sempre responda.
      await conn.execute(
        'INSERT INTO players (world_id, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE user_id = user_id',
        [worldId, req.user.id],
      );

      await conn.commit();
      res.status(201).json({
        world: {
          id: worldId,
          name,
          worldgenVersion: config.worldgenVersion,
          lastDimension: 'overworld',
          revision: 0,
          blockEdits: 0,
        },
      });
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  } catch (err) {
    next(err);
  }
});

// ── Carga completa ─────────────────────────────────────────────────────────

/**
 * GET /api/worlds/:id — tudo que o cliente precisa para começar, exceto os
 * blocos. Os edits vêm por região, em /blocks, para não carregar o mundo
 * inteiro de uma vez.
 */
worldRouter.get('/:id', async (req, res, next) => {
  try {
    const worldId = toInt(req.params.id, 'id', { min: 1 });
    const world = await loadOwnedWorld(worldId, req.user.id);

    if (world.worldgen_version !== config.worldgenVersion) {
      // Não é um erro do cliente: o save é válido, mas a geração mudou.
      throw conflict(
        'Este mundo foi salvo com outra versão do gerador de terreno. Regere o mundo para continuar.',
        { code: 'WORLDGEN_MISMATCH', saved: world.worldgen_version, current: config.worldgenVersion },
      );
    }

    const [[playerRows], [invRows], [armorRows], [containerRows], [blockCountRows]] =
      await Promise.all([
        getPool().execute(
          'SELECT x, y, z, yaw, pitch, health, max_health, hunger, xp, level, is_flying, camera_mode ' +
            'FROM players WHERE world_id = ? AND user_id = ?',
          [worldId, req.user.id],
        ),
        getPool().execute(
          'SELECT slot_index, item_type, item_count FROM inventory_slots ' +
            'WHERE world_id = ? AND user_id = ? ORDER BY slot_index',
          [worldId, req.user.id],
        ),
        getPool().execute(
          'SELECT slot_index, item_type, item_count FROM armor_slots ' +
            'WHERE world_id = ? AND user_id = ? ORDER BY slot_index',
          [worldId, req.user.id],
        ),
        getPool().execute(
          'SELECT dimension, kind, x, y, z, payload FROM containers WHERE world_id = ?',
          [worldId],
        ),
        getPool().execute('SELECT COUNT(*) AS n FROM block_edits WHERE world_id = ?', [worldId]),
      ]);

    res.json({
      world: {
        id: world.id,
        name: world.name,
        worldgenVersion: world.worldgen_version,
        timeOfDay: Number(world.time_of_day),
        weather: world.weather,
        lastDimension: world.last_dimension,
        revision: world.revision,
        blockEditCount: Number(blockCountRows[0].n),
        updatedAt: world.updated_at,
      },
      player: playerRows.length > 0 ? {
        x: Number(playerRows[0].x),
        y: Number(playerRows[0].y),
        z: Number(playerRows[0].z),
        yaw: Number(playerRows[0].yaw),
        pitch: Number(playerRows[0].pitch),
        health: Number(playerRows[0].health),
        maxHealth: Number(playerRows[0].max_health),
        hunger: Number(playerRows[0].hunger),
        xp: Number(playerRows[0].xp),
        level: playerRows[0].level,
        isFlying: Boolean(playerRows[0].is_flying),
        cameraMode: playerRows[0].camera_mode,
      } : null,
      inventory: invRows.map((r) => ({
        slot: r.slot_index,
        type: r.item_type,
        count: r.item_count,
      })),
      armor: armorRows.map((r) => ({
        slot: r.slot_index,
        type: r.item_type,
        count: r.item_count,
      })),
      containers: containerRows.map((r) => ({
        dimension: r.dimension,
        kind: r.kind,
        x: r.x,
        y: r.y,
        z: r.z,
        payload: typeof r.payload === 'string' ? JSON.parse(r.payload) : r.payload,
      })),
    });
  } catch (err) {
    next(err);
  }
});

// ── Diff de blocos ─────────────────────────────────────────────────────────

/**
 * GET /api/worlds/:id/blocks?dimension=overworld&minX=-16&maxX=16&minZ=..&maxZ=..
 *
 * Regionais de propósito: quando o jogador anda, o cliente pede só as faixas
 * novas. Trazer o mundo inteiro num único GET seria lento demais.
 */
worldRouter.get('/:id/blocks', async (req, res, next) => {
  try {
    const worldId = toInt(req.params.id, 'id', { min: 1 });
    await loadOwnedWorld(worldId, req.user.id);

    const dimension = dimensionOf(req.query.dimension);
    const minX = toInt(req.query.minX, 'minX', { min: -30_000_000, max: 30_000_000 });
    const maxX = toInt(req.query.maxX, 'maxX', { min: -30_000_000, max: 30_000_000 });
    const minZ = toInt(req.query.minZ, 'minZ', { min: -30_000_000, max: 30_000_000 });
    const maxZ = toInt(req.query.maxZ, 'maxZ', { min: -30_000_000, max: 30_000_000 });
    if (minX > maxX || minZ > maxZ) throw badRequest('minX precisa ser <= maxX, e minZ <= maxZ.');

    const minY = req.query.minY === undefined ? 0 : toInt(req.query.minY, 'minY', { min: 0, max: CHUNK_HEIGHT - 1 });
    const maxY = req.query.maxY === undefined ? CHUNK_HEIGHT - 1 : toInt(req.query.maxY, 'maxY', { min: 0, max: CHUNK_HEIGHT - 1 });
    if (minY > maxY) throw badRequest('minY precisa ser <= maxY.');

    const [rows] = await getPool().execute(
      'SELECT x, y, z, block_type, fluid_level FROM block_edits ' +
        'WHERE world_id = ? AND dimension = ? ' +
        '  AND x BETWEEN ? AND ? AND z BETWEEN ? AND ? AND y BETWEEN ? AND ? ' +
        'ORDER BY y, x, z',
      [worldId, dimension, minX, maxX, minZ, maxZ, minY, maxY],
    );

    res.json({
      dimension,
      region: { minX, maxX, minY, maxY, minZ, maxZ },
      count: rows.length,
      // [x, y, z, blockType, fluidLevel] — tuple para deixar o payload pequeno
      // no JSON e o parse do cliente mais rápido.
      edits: rows.map((r) => [r.x, r.y, r.z, r.block_type, r.fluid_level]),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/worlds/:id/blocks — upsert em lote do diff.
 *
 * Idempotente por construção: a chave primária é (world_id, dimension, x, y, z)
 * e usamos ON DUPLICATE KEY UPDATE, então reenviar o mesmo lote é seguro. Isso
 * importa porque o cliente reenvia tudo o que ainda não confirmamos — perder
 * uma resposta não pode corromper o save.
 */
worldRouter.post('/:id/blocks', async (req, res, next) => {
  try {
    const worldId = toInt(req.params.id, 'id', { min: 1 });
    await loadOwnedWorld(worldId, req.user.id);

    const dimension = dimensionOf(req.body?.dimension);
    const rawEdits = req.body?.edits;
    if (!Array.isArray(rawEdits)) throw badRequest('"edits" precisa ser uma lista.');
    if (rawEdits.length === 0) return res.json({ saved: 0 });

    if (rawEdits.length > MAX_BLOCKS_PER_REQUEST) {
      throw tooLarge(`Máximo de ${MAX_BLOCKS_PER_REQUEST} blocos por requisição.`);
    }

    // Validamos tudo antes de escrever: uma transação meio aplicada seria pior
    // que uma requisição rejeitada.
    const rows = rawEdits.map((edit, i) => {
      if (!Array.isArray(edit) || edit.length < 4) {
        throw badRequest(`edits[${i}] precisa ser [x, y, z, blockType, fluidLevel?].`);
      }
      return [
        worldId,
        dimension,
        toInt(edit[0], `edits[${i}].x`, { min: -30_000_000, max: 30_000_000 }),
        toInt(edit[1], `edits[${i}].y`, { min: 0, max: CHUNK_HEIGHT - 1 }),
        toInt(edit[2], `edits[${i}].z`, { min: -30_000_000, max: 30_000_000 }),
        toInt(edit[3], `edits[${i}].blockType`, { min: 0, max: 65535 }),
        toInt(edit[4] ?? 0, `edits[${i}].fluidLevel`, { min: 0, max: 15 }),
      ];
    });

    const conn = await getPool().getConnection();
    const startedAt = Date.now();
    try {
      await conn.beginTransaction();

      for (let i = 0; i < rows.length; i += BLOCK_INSERT_CHUNK) {
        const slice = rows.slice(i, i + BLOCK_INSERT_CHUNK);
        const placeholders = slice.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
        const values = slice.flat();
        await conn.execute(
          'INSERT INTO block_edits (world_id, dimension, x, y, z, block_type, fluid_level) ' +
            `VALUES ${placeholders} ` +
            'ON DUPLICATE KEY UPDATE block_type = VALUES(block_type), fluid_level = VALUES(fluid_level)',
          values,
        );
      }

      await conn.commit();

      const [bumped] = await conn.execute(
        'UPDATE worlds SET revision = revision + 1 WHERE id = ?',
        [worldId],
      );
      const [[meta]] = await conn.execute('SELECT revision FROM worlds WHERE id = ?', [worldId]);

      await getPool().execute(
        'INSERT INTO save_log (world_id, user_id, revision, blocks_saved, duration_ms) VALUES (?, ?, ?, ?, ?)',
        [worldId, req.user.id, meta.revision, rows.length, Date.now() - startedAt],
      );

      res.json({ saved: rows.length, revision: meta.revision, updated: bumped.affectedRows > 0 });
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  } catch (err) {
    next(err);
  }
});

/** DELETE /api/worlds/:id/blocks — limpa o diff (regerar o mundo do zero). */
worldRouter.delete('/:id/blocks', async (req, res, next) => {
  try {
    const worldId = toInt(req.params.id, 'id', { min: 1 });
    await loadOwnedWorld(worldId, req.user.id);

    const result = await getPool().execute('DELETE FROM block_edits WHERE world_id = ?', [worldId]);
    res.json({ cleared: result.affectedRows ?? 0 });
  } catch (err) {
    next(err);
  }
});

// ── Estado do jogador e inventário ─────────────────────────────────────────

/** PUT /api/worlds/:id/player */
worldRouter.put('/:id/player', async (req, res, next) => {
  try {
    const worldId = toInt(req.params.id, 'id', { min: 1 });
    await loadOwnedWorld(worldId, req.user.id);

    const b = req.body ?? {};
    const player = {
      x: toFloat(b.x, 'x', { min: -30_000_000, max: 30_000_000 }),
      y: toFloat(b.y, 'y', { min: -64, max: 1024 }),
      z: toFloat(b.z, 'z', { min: -30_000_000, max: 30_000_000 }),
      yaw: toFloat(b.yaw ?? 0, 'yaw'),
      pitch: toFloat(b.pitch ?? 0, 'pitch'),
      health: toFloat(b.health ?? 20, 'health', { min: 0, max: 1024 }),
      maxHealth: toFloat(b.maxHealth ?? 20, 'maxHealth', { min: 1, max: 1024 }),
      hunger: toFloat(b.hunger ?? 20, 'hunger', { min: 0, max: 20 }),
      xp: toFloat(b.xp ?? 0, 'xp', { min: 0, max: 1e9 }),
      level: toInt(b.level ?? 1, 'level', { min: 0, max: 100_000 }),
      isFlying: b.isFlying ? 1 : 0,
      cameraMode: toInt(b.cameraMode ?? 0, 'cameraMode', { min: 0, max: 8 }),
    };

    const dimension = dimensionOf(b.dimension);

    const [result] = await getPool().execute(
      'INSERT INTO players ' +
        '(world_id, user_id, x, y, z, yaw, pitch, health, max_health, hunger, xp, level, is_flying, camera_mode) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE ' +
        '  x = VALUES(x), y = VALUES(y), z = VALUES(z), yaw = VALUES(yaw), pitch = VALUES(pitch), ' +
        '  health = VALUES(health), max_health = VALUES(max_health), hunger = VALUES(hunger), ' +
        '  xp = VALUES(xp), level = VALUES(level), is_flying = VALUES(is_flying), camera_mode = VALUES(camera_mode)',
      [worldId, req.user.id, player.x, player.y, player.z, player.yaw, player.pitch,
        player.health, player.maxHealth, player.hunger, player.xp, player.level,
        player.isFlying, player.cameraMode],
    );

    await getPool().execute(
      'UPDATE worlds SET last_dimension = ?, time_of_day = COALESCE(?, time_of_day) WHERE id = ?',
      [dimension, b.timeOfDay === undefined ? null : toFloat(b.timeOfDay, 'timeOfDay'), worldId],
    );

    res.json({ ok: true, created: result.affectedRows > 0 });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/worlds/:id/inventory
 *
 * Enviamos o inventário inteiro e substituímos tudo: é 40 linhas no máximo, e
 * um diff parcial exigiria o número da revisão para não perder edição concorrente.
 */
worldRouter.put('/:id/inventory', async (req, res, next) => {
  try {
    const worldId = toInt(req.params.id, 'id', { min: 1 });
    await loadOwnedWorld(worldId, req.user.id);

    const inventory = Array.isArray(req.body?.inventory) ? req.body.inventory : [];
    const armor = Array.isArray(req.body?.armor) ? req.body.armor : [];

    if (inventory.length > 36) throw badRequest('O inventário tem no máximo 36 slots.');
    if (armor.length > 4) throw badRequest('Há no máximo 4 slots de armadura.');

    const invRows = inventory.map((item, i) => {
      const norm = normalizeItem(item, `inventory[${i}]`);
      return [worldId, req.user.id, toInt(item.slot ?? i, `inventory[${i}].slot`, { min: 0, max: 35 }), norm.type, norm.count];
    });
    const armRows = armor.map((item, i) => {
      const norm = normalizeItem(item, `armor[${i}]`);
      return [worldId, req.user.id, toInt(item.slot ?? i, `armor[${i}].slot`, { min: 0, max: 3 }), norm.type, norm.count];
    });

    const conn = await getPool().getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute('DELETE FROM inventory_slots WHERE world_id = ? AND user_id = ?', [worldId, req.user.id]);
      await conn.execute('DELETE FROM armor_slots WHERE world_id = ? AND user_id = ?', [worldId, req.user.id]);

      if (invRows.length > 0) {
        await conn.execute(
          'INSERT INTO inventory_slots (world_id, user_id, slot_index, item_type, item_count) ' +
            `VALUES ${invRows.map(() => '(?, ?, ?, ?, ?)').join(', ')}`,
          invRows.flat(),
        );
      }
      if (armRows.length > 0) {
        await conn.execute(
          'INSERT INTO armor_slots (world_id, user_id, slot_index, item_type, item_count) ' +
            `VALUES ${armRows.map(() => '(?, ?, ?, ?, ?)').join(', ')}`,
          armRows.flat(),
        );
      }

      await conn.commit();
      res.json({ ok: true, inventory: invRows.length, armor: armRows.length });
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  } catch (err) {
    next(err);
  }
});

// ── Contêineres ────────────────────────────────────────────────────────────

/** PUT /api/worlds/:id/containers — upsert de baús e fornalhas. */
worldRouter.put('/:id/containers', async (req, res, next) => {
  try {
    const worldId = toInt(req.params.id, 'id', { min: 1 });
    await loadOwnedWorld(worldId, req.user.id);

    const raw = Array.isArray(req.body?.containers) ? req.body.containers : [];
    if (raw.length > MAX_CONTAINERS_PER_REQUEST) {
      throw tooLarge(`Máximo de ${MAX_CONTAINERS_PER_REQUEST} contêineres por requisição.`);
    }
    if (raw.length === 0) return res.json({ saved: 0 });

    const rows = raw.map((c, i) => {
      if (!VALID_CONTAINER_KINDS.has(c?.kind)) {
        throw badRequest(`containers[${i}].kind precisa ser "chest" ou "furnace".`);
      }
      const payload = JSON.stringify(c.payload ?? null);
      if (payload === undefined) throw badRequest(`containers[${i}].payload não é serializável.`);
      return [
        worldId,
        dimensionOf(c.dimension),
        c.kind,
        toInt(c.x, `containers[${i}].x`, { min: -30_000_000, max: 30_000_000 }),
        toInt(c.y, `containers[${i}].y`, { min: 0, max: CHUNK_HEIGHT - 1 }),
        toInt(c.z, `containers[${i}].z`, { min: -30_000_000, max: 30_000_000 }),
        payload,
      ];
    });

    for (const row of rows) {
      await getPool().execute(
        'INSERT INTO containers (world_id, dimension, kind, x, y, z, payload) VALUES (?, ?, ?, ?, ?, ?, ?) ' +
          'ON DUPLICATE KEY UPDATE payload = VALUES(payload)',
        row,
      );
    }

    res.json({ saved: rows.length });
  } catch (err) {
    next(err);
  }
});
