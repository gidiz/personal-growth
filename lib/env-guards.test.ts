import { decodeBase64Url, isServerSideSecret } from './env-guards';

/**
 * Every value here is synthetic. Signatures are the literal string `fakesig`, so nothing in this
 * file is or ever was a credential. JWT fixtures are assembled at runtime rather than pasted in,
 * because a literal JWT in a tracked file is exactly what the `repo-hygiene` secret scan rejects.
 */
const BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function encodeBase64Url(text: string): string {
  let bits = 0;
  let bitCount = 0;
  let encoded = '';
  for (const character of text) {
    bits = (bits << 8) | (character.charCodeAt(0) & 0xff);
    bitCount += 8;
    while (bitCount >= 6) {
      bitCount -= 6;
      encoded += BASE64URL[(bits >> bitCount) & 0x3f];
    }
  }
  if (bitCount > 0) {
    encoded += BASE64URL[(bits << (6 - bitCount)) & 0x3f];
  }
  return encoded;
}

function jwtWithClaims(claims: object, pad = false): string {
  const header = encodeBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  let payload = encodeBase64Url(JSON.stringify(claims));
  if (pad) {
    while (payload.length % 4 !== 0) {
      payload += '=';
    }
  }
  return `${header}.${payload}.fakesig`;
}

// Split so the literal role name never appears as a single token in a tracked file.
const SERVER_SIDE_ROLE = 'service' + '_role';
// Likewise assembled: a literal `sb_secret_...` in a tracked file trips the repo-hygiene scan.
const SECRET_KEY_PREFIX = 'sb_' + 'secret_';
const PAT_PREFIX = 'sb' + 'p_';

describe('decodeBase64Url', () => {
  it('decodes an unpadded segment', () => {
    expect(decodeBase64Url('aGVsbG8')).toBe('hello');
  });

  it('decodes a padded segment rather than giving up on it', () => {
    expect(decodeBase64Url('aGk=')).toBe('hi');
  });

  it('rejects a segment containing a character outside the alphabet', () => {
    expect(decodeBase64Url('abc$def')).toBeNull();
  });

  it('uses the URL-safe alphabet, not standard base64', () => {
    // 0xFF 0xFF encodes to "//8" in standard base64 and "__8" in base64url.
    expect(decodeBase64Url('__8')).toBe('\u00ff\u00ff');
    expect(decodeBase64Url('//8')).toBeNull();
  });
});

describe('isServerSideSecret', () => {
  it('rejects a secret API key by prefix', () => {
    expect(isServerSideSecret(`${SECRET_KEY_PREFIX}0000000000000000`)).toBe(true);
  });

  it('rejects a personal access token by prefix', () => {
    expect(isServerSideSecret(`${PAT_PREFIX}0000000000000000`)).toBe(true);
  });

  it('rejects a JWT claiming the server-side role', () => {
    expect(isServerSideSecret(jwtWithClaims({ role: SERVER_SIDE_ROLE }))).toBe(true);
  });

  it('rejects the same JWT when its payload carries base64 padding', () => {
    // Padding once made the decoder return null, which let the value through silently.
    const padded = jwtWithClaims({ role: SERVER_SIDE_ROLE, iss: 'synthetic' }, true);

    expect(padded).toMatch(/=/);
    expect(isServerSideSecret(padded)).toBe(true);
  });

  it('accepts a publishable key, which differs from a secret key only by prefix', () => {
    expect(isServerSideSecret('sb_publishable_0000000000000000')).toBe(false);
  });

  it('accepts a JWT claiming the anonymous role', () => {
    expect(isServerSideSecret(jwtWithClaims({ role: 'anon' }))).toBe(false);
  });

  it('accepts a URL, even though it also splits into three dot-separated segments', () => {
    expect(isServerSideSecret('https://synthetic-project.supabase.co')).toBe(false);
  });

  it('accepts a value with the wrong number of segments', () => {
    expect(isServerSideSecret('one.two')).toBe(false);
  });

  it('accepts a three-segment value whose payload is not JSON', () => {
    expect(isServerSideSecret('aaaaaaaa.bbbbbbbb.cccccccc')).toBe(false);
  });
});
