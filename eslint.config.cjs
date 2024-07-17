const prettier = require('eslint-plugin-prettier')

module.exports = [
  {
    ...require('eslint-config-prettier'),
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.ts'],
    plugins: {
      prettier,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['dist/'],
  },
]
