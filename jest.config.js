/** @type {import('jest').Config} */
module.exports = {
  // The preset already maps the `@/` alias and, critically, `react-native` itself. Do not add
  // `moduleNameMapper` here: it replaces the preset's map wholesale rather than merging with it.
  preset: 'jest-expo',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
  ],
  // A config that matches no test file exits 0, which would make the CI gate green over nothing.
  passWithNoTests: false,
};
