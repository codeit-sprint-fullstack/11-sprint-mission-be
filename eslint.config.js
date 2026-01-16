export default [
  js.config.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      global: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': [
        'word',
        {argsIgnorePattern: '^_'}],
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
