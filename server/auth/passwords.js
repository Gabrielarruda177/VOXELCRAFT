/**
 * Hash de senha com scrypt, do módulo `node:crypto` (sem dependência nativa).
 *
 * Guardamos o resultado como uma string auto-descritiva:
 *
 *   scrypt$N$r$p$<salt base64url>$<hash base64url>
 *
 * Guardar os parâmetros dentro do hash permite elevá-los no futuro sem
 * invalidar as senhas já criadas: ao verificar, lemos N/r/p do próprio hash.
 *
 * Usamos scrypt em vez de bcrypt porque não exige compilação nativa — que
 * quebra em Windows sem toolchain — e porque o Node já traz a implementação.
 */

import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCb);

// Parâmetros: ~16 MB de memória por hash, 1 passe. Bom para senha de interação
// humana (que é o nosso caso: login de jogo) e resistente a GPU, sem estourar
// o servidor de jogo.
const N = 16384;
const R = 8;
const P = 1;
const KEYLEN = 64;
const SALT_BYTES = 16;

// scrypt precisa de no máximo 32 MB por padrão no Node; 128*N*r dá 16 MB,
// então o headroom é enorme, mas deixamos explícito para não depender do padrão.
const MAX_MEM = 64 * 1024 * 1024;

/** Limites de senha. Curta demais é o erro mais comum em registro. */
export const PASSWORD_MIN = 6;
export const PASSWORD_MAX = 200;

function encode(buf) {
  return buf.toString('base64url');
}

/** @param {string} password @returns {Promise<string>} */
export async function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES);
  const derived = await scrypt(password.normalize('NFKC'), salt, KEYLEN, {
    N, r: R, p: P, maxmem: MAX_MEM,
  });
  return `scrypt$${N}$${R}$${P}$${encode(salt)}$${encode(derived)}`;
}

/**
 * Compara uma senha com um hash guardado.
 * Resposta constante: não leak de tempo sobre o conteúdo do hash.
 *
 * @param {string} password
 * @param {string} stored
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, stored) {
  if (typeof stored !== 'string') return false;

  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

  const n = Number.parseInt(parts[1], 10);
  const r = Number.parseInt(parts[2], 10);
  const p = Number.parseInt(parts[3], 10);
  if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(p)) return false;

  let salt;
  let expected;
  try {
    salt = Buffer.from(parts[4], 'base64url');
    expected = Buffer.from(parts[5], 'base64url');
  } catch {
    return false;
  }
  if (expected.length === 0) return false;

  let derived;
  try {
    derived = await scrypt(password.normalize('NFKC'), salt, expected.length, {
      N: n, r, p, maxmem: MAX_MEM,
    });
  } catch {
    return false;
  }

  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

/**
 * Regras de senha. Retorna null se estiver ok, ou a mensagem de erro.
 * @param {string} password
 * @returns {string|null}
 */
export function validatePassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    return 'Informe uma senha.';
  }
  if (password.length < PASSWORD_MIN) {
    return `A senha precisa ter pelo menos ${PASSWORD_MIN} caracteres.`;
  }
  if (password.length > PASSWORD_MAX) {
    return `A senha pode ter no máximo ${PASSWORD_MAX} caracteres.`;
  }
  return null;
}
