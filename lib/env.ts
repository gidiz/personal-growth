/**
 * Typed, fail-fast client environment configuration.
 *
 * This is the ONLY module allowed to touch `process.env`. Everything else imports `env`.
 *
 * Two hard rules, both enforced by `repo-hygiene` and by review:
 *  - only `EXPO_PUBLIC_*` variables may be read here; anything else is simply not present in a
 *    client bundle and reading it would silently yield `undefined`;
 *  - `EXPO_PUBLIC_*` values are inlined into the shipped JavaScript bundle at build time, so they
 *    are public. A service-role key, a database password, an AI provider secret or an MCP token
 *    must never be given an `EXPO_PUBLIC_` name.
 */

/** Raised when the app is started without a usable client configuration. */
export class EnvironmentConfigurationError extends Error {
  constructor(
    readonly variableName: string,
    reason: string,
  ) {
    super(
      `Environment variable ${variableName} ${reason}. ` +
        `Copy .env.example to .env at the repository root, fill in the client-safe values, ` +
        `then restart the dev server with "npx expo start --clear" so the new value is inlined.`,
    );
    this.name = 'EnvironmentConfigurationError';
  }
}

// babel-preset-expo only inlines `process.env.EXPO_PUBLIC_*` when it is written as a literal
// member access, so every variable has to be spelled out once, here.
const RAW = {
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
} as const;

type PublicEnvName = keyof typeof RAW;

// Supabase shows the publishable key and the secret key side by side, and the legacy forms of both
// are JWTs of indistinguishable outward shape. A paste error here would compile an RLS-bypassing
// credential into the shipped bundle, and no CI scan can catch it because .env is untracked.
const SERVER_SIDE_ROLE = 'service_role';

const BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Hermes and the browser both provide `atob`, but a security check that must never silently stop
// working is not worth hanging on a host global.
function decodeBase64Url(segment: string): string | null {
  let bits = 0;
  let bitCount = 0;
  let decoded = '';
  for (const character of segment) {
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

function isServerSideSecret(value: string): boolean {
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

function requireValue(name: PublicEnvName): string {
  const value = RAW[name]?.trim();
  if (!value) {
    throw new EnvironmentConfigurationError(name, 'is missing or empty');
  }
  if (isServerSideSecret(value)) {
    throw new EnvironmentConfigurationError(
      name,
      'holds a server-side secret, which must never be given an EXPO_PUBLIC_ name because ' +
        'EXPO_PUBLIC_ values are compiled into the shipped bundle',
    );
  }
  return value;
}

function requireHttpsUrl(name: PublicEnvName): string {
  const value = requireValue(name);
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    // The value itself is never echoed: an env value is configuration, not diagnostic output.
    throw new EnvironmentConfigurationError(name, 'is not a valid absolute URL');
  }
  if (parsed.protocol !== 'https:') {
    throw new EnvironmentConfigurationError(name, 'must use https');
  }
  return parsed.origin;
}

/**
 * Validated client configuration. Evaluated on import, so a misconfigured app fails at startup
 * with a named variable instead of producing an `undefined` far away from the cause.
 */
export const env = Object.freeze({
  supabaseUrl: requireHttpsUrl('EXPO_PUBLIC_SUPABASE_URL'),
  // Deliberately not shape-checked: Supabase issues both legacy JWT anon keys and the newer
  // publishable-key format, and pinning one shape here would break on rotation.
  supabaseAnonKey: requireValue('EXPO_PUBLIC_SUPABASE_ANON_KEY'),
});

export type Env = typeof env;
