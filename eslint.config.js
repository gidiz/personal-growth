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
    ignores: ['dist/*', 'web-build/*', 'coverage/*', '.expo/*'],
  },
]);
