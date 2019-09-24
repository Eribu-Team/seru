module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "airbnb-base",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  rules: {
    "class-methods-use-this": "off",
    "object-curly-newline": 0,
    quotes: [
      "error",
      "double",
    ],
  },
};
