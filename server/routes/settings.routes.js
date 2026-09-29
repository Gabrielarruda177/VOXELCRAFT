/**
 * Predefinições do jogador.
 *
 * As Configurações do jogo (Settings em titleScreen.js) viviam só em memória:
 * fechar a página perdia tudo, e três dos quatro sliders não tinham consumidor
 * nenhum. Aqui elas duram entre sessões.
 */

import { Router } from 'express';
import { getPool } from '../db/pool.js';
import { badRequest, requireAuth } from '../middleware.js';

export const settingsRouter = Router();
settingsRouter.use(requireAuth);

function intIn(value, name, min, max, fallback) {
  if (value === undefined || value === null) return fallback;
  const n = Number(value);
  if (!Number.isFinite(n)) throw badRequest(`"${name}" precisa ser um número.`);
  const rounded = Math.round(n);
  if (rounded < min || rounded > max) {
    throw badRequest(`"${name}" precisa estar entre ${min} e ${max}.`);
  }
  return rounded;
}

/** GET /api/settings */
settingsRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await getPool().execute(
      'SELECT render_distance, fov, mouse_sensitivity, music_volume FROM user_settings WHERE user_id = ?',
      [req.user.id],
    );

    if (rows.length === 0) {
      // Nunca houve save: devolve os padrões do cliente em vez de 404, para
      // que o primeiro carregamento não precise de tratamento especial.
      return res.json({
        settings: { renderDistance: 5, fov: 75, mouseSensitivity: 1.0, musicVolume: 80 },
        saved: false,
      });
    }

    const r = rows[0];
    res.json({
      settings: {
        renderDistance: r.render_distance,
        fov: r.fov,
        mouseSensitivity: Number(r.mouse_sensitivity),
        musicVolume: r.music_volume,
      },
      saved: true,
    });
  } catch (err) {
    next(err);
  }
});

/** PUT /api/settings */
settingsRouter.put('/', async (req, res, next) => {
  try {
    const b = req.body?.settings ?? req.body ?? {};

    const renderDistance = intIn(b.renderDistance, 'renderDistance', 1, 16, 5);
    const fov = intIn(b.fov, 'fov', 30, 140, 75);
    const mouseSensitivity = Number((intIn(b.mouseSensitivity, 'mouseSensitivity', 1, 100, 100) / 100).toFixed(2));
    const musicVolume = intIn(b.musicVolume, 'musicVolume', 0, 100, 80);

    await getPool().execute(
      'INSERT INTO user_settings (user_id, render_distance, fov, mouse_sensitivity, music_volume) ' +
        'VALUES (?, ?, ?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE render_distance = VALUES(render_distance), fov = VALUES(fov), ' +
        '  mouse_sensitivity = VALUES(mouse_sensitivity), music_volume = VALUES(music_volume)',
      [req.user.id, renderDistance, fov, mouseSensitivity, musicVolume],
    );

    res.json({
      ok: true,
      settings: { renderDistance, fov, mouseSensitivity, musicVolume },
    });
  } catch (err) {
    next(err);
  }
});
