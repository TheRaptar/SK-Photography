/**
 * Very important honesty note:
 * This is a STATIC, backend-less site. There is no server to check a
 * password against, so this gate can only ever be a client-side lock —
 * it keeps the panel away from casual visitors and search engines, but
 * anyone determined enough to inspect the deployed JS bundle can find the
 * hash below and try to crack it offline. Treat the secret URL plus
 * passphrase as "keeps this off the beaten path," not as bank-grade
 * security. If you ever need to protect something sensitive (like
 * unreleased client photos), that requires a real backend with
 * server-side auth.
 *
 * To set your own passphrase before deploying:
 * 1. Open any browser console and run:
 *      crypto.subtle.digest('SHA-256', new TextEncoder().encode('your-new-passphrase'))
 *        .then(b => console.log(Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('')))
 * 2. Copy the printed 64-character hex string into PASSPHRASE_HASH below.
 */

// Default passphrase is "sk-studio-2026" — CHANGE THIS before you deploy.
export const PASSPHRASE_HASH =
  'f31909372f4bfa527a7078713dd9c8423c530a7f4c29c512586223d43817c8fd';

const SESSION_KEY = 'sk-studio-admin-session';

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassphrase(input: string): Promise<boolean> {
  const hash = await sha256Hex(input);
  return hash === PASSPHRASE_HASH;
}

export function isAdminSessionActive(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function startAdminSession(): void {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export function endAdminSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
