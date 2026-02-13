/**
 * Content protection: deep freeze + SHA-256 integrity verification.
 */

export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return obj;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const EXPECTED_HASH = import.meta.env.VITE_CONTENT_HASH || '';

export async function verifyIntegrity(contents: unknown[]): Promise<boolean> {
  if (import.meta.env.DEV || !EXPECTED_HASH) return true;
  try {
    const hash = await sha256(JSON.stringify(contents));
    return hash === EXPECTED_HASH;
  } catch {
    return true;
  }
}
