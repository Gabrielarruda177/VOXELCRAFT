/**
 * Middlewares compartilhados: leitura de JSON, sessão obrigatória e um
 * limitador de requisições simples.
 */

import express from 'express';
import { extractToken, resolveSession } from './auth/sessions.js';

/** Erro de aplicação com status HTTP — lançado pelas rotas e tratado no index. */
export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

export const badRequest = (msg, details) => new HttpError(400, msg, details);
export const unauthorized = (msg = 'Sessão inválida ou expirada.') => new HttpError(401, msg);
export const forbidden = (msg = 'Sem permissão para este recurso.') => new HttpError(403, msg);
export const notFound = (msg = 'Recurso não encontrado.') => new HttpError(404, msg);
export const conflict = (msg) => new HttpError(409, msg);
export const tooLarge = (msg) => new HttpError(413, msg);

/** JSON com limite de tamanho: o diff de blocos pode ser grande, mas não infinito. */
export function jsonBody(limit = '12mb') {
  return express.json({ limit });
}

/**
 * Exige uma sessão válida e pendura o usuário em req.user.
 * Uso: router.post('/x', requireAuth, handler)
 */
export async function requireAuth(req, _res, next) {
  try {
    const token = extractToken(req);
    if (!token) throw unauthorized('Faça login para continuar.');

    const user = await resolveSession(token);
    if (!user) throw unauthorized();

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Limitador por janela deslizante simples, em memória.
 * Suficiente para um servidor de jogo local; um deploy multi-instância
 * precisaria trocar por Redis.
 */
export function rateLimit({ windowMs = 60_000, max = 120, message = 'Muitas requisições. Tente de novo em instantes.' } = {}) {
  const hits = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, windowMs).unref?.();

  return function rateLimitMiddleware(req, res, next) {
    const key = req.ip || 'unknown';
    const now = Date.now();
    let entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }

    entry.count++;
    const remaining = Math.max(0, max - entry.count);
    res.set('X-RateLimit-Remaining', String(remaining));

    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return next(new HttpError(429, message));
    }
    next();
  };
}
