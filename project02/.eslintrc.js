module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'no-console': 'off',
    'import/newline-after-import': 'off',
    quotes: ['error', 'single'],
    'no-underscore-dangle': [2, { allow: ['_parseUrl'] }],
  },
};
