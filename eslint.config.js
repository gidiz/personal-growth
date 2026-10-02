const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // `.rule/coding-rules.md` allows `any` only with justification, so it must be opted into explicitly.
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    // The raw backends take any string key and any string value. Reaching past lib/storage would
    // bypass the key allowlist, the per-key value schema and the credential check all at once.
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['lib/storage/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // Only the capability-bearing modules. backend.types carries a type and no capability.
              group: [
                '**/storage/backend',
                '**/storage/backend.native',
                '**/storage/backend.web',
                '../**/storage/backend',
                '../**/storage/backend.native',
                '../**/storage/backend.web',
              ],
              message:
                'Use `cacheStorage` from @/lib/storage. It is the only entry point that enforces the non-sensitive-cache contract.',
            },
          ],
        },
      ],
    },
  },
  {
    // `lib/env.ts` owns the client configuration boundary; a read anywhere else bypasses the
    // validation and the EXPO_PUBLIC_ denylist.
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['lib/env.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "MemberExpression[object.name='process'][property.name='env']",
          message: 'Import `env` from @/lib/env. It is the only module allowed to read process.env.',
        },
      ],
    },
  },
  {
    ignores: ['dist/*', 'web-build/*', 'coverage/*', '.expo/*'],
  },
]);
