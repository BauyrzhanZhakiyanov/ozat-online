module.exports = {
  extends: 'expo',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    'react/no-children-prop': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'linebreak-style': 0,
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-constant-condition': 'warn',
    'react/prop-types': 'off',
  },
  ignorePatterns: ['/dist/*'],
}
