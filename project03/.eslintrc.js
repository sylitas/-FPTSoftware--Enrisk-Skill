module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: ['eslint-config-airbnb'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    requireConfigFile: false,
  },
  rules: {
    'no-console': 'off',
    'import/newline-after-import': 'off',
    'no-underscore-dangle': [2, { allow: ['_parseUrl'] }],
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'linebreak-style': 'off',
    'max-len': ['error', { code: 120 }],
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
