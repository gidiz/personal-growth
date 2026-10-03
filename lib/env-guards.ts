/**
 * Pure predicates for the client environment boundary.
 *
 * Separate from `lib/env.ts` because that module validates on import and throws when the app is
 * misconfigured, which makes it impossible to unit-test these rules directly. Nothing here reads
 * `process.env` or has any side effect.
 */

// Supabase shows the publishable key and the secret key side by side, and the legacy forms of both
// are JWTs of indistinguishable outward shape. A paste error would compile an RLS-bypassing
// credential into the shipped bundle, and no CI scan can catch it because .env is untracked.
const SERVER_SIDE_ROLE = 'service_role';

const BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Hermes and the browser both provide `atob`, but a security check that must never silently stop
// working is not worth hanging on a host global.
export function decodeBase64Url(segment: string): string | null {
  let bits = 0;
  let bitCount = 0;
  let decoded = '';
  // JWTs are unpadded per RFC 7515, but padding must not turn this check into a silent pass.
  for (const character of segment.replace(/={1,2}$/, '')) {
    const index = BASE64URL.indexOf(character);
    if (index < 0) {
      return null;
    }
    bits = (bits << 6) | index;
    bitCount += 6;
    if (bitCount >= 8) {
      bitCount -= 8;
      decoded += String.fromCharCode((bits >> bitCount) & 0xff);
    }
  }
  return decoded;
}

/** True when the value is a Supabase credential that must never leave the server. */
export function isServerSideSecret(value: string): boolean {
  if (/^sb_secret_/.test(value) || /^sbp_/.test(value)) {
    return true;
  }

  const segments = value.split('.');
  if (segments.length !== 3) {
    return false;
  }
  const payload = decodeBase64Url(segments[1]);
  if (payload === null) {
    return false;
  }
  try {
    const claims: unknown = JSON.parse(payload);
    return (
      typeof claims === 'object' &&
      claims !== null &&
      (claims as { role?: unknown }).role === SERVER_SIDE_ROLE
    );
  } catch {
    return false;
  }
}
