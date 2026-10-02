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
              group: ['**/storage/backend', '**/storage/backend.*'],
              message:
                'Use `cacheStorage` from @/lib/storage. It is the only entry point that enforces the non-sensitive-cache contract.',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['dist/*', 'web-build/*', 'coverage/*', '.expo/*'],
  },
]);
