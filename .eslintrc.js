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
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  plugins: ["jsdoc"],
  rules: {
    "max-len": ["error", { code: 120 }],
    "class-methods-use-this": "off",
    "object-curly-newline": 0,
    quotes: [
      "error",
      "double",
    ],
    "jsdoc/check-alignment": 1, // Recommended
    "jsdoc/check-examples": 0,
    "jsdoc/check-indentation": 1,
    "jsdoc/check-param-names": 1, // Recommended
    "jsdoc/check-syntax": 1,
    "jsdoc/check-tag-names": 1, // Recommended
    "jsdoc/check-types": 1, // Recommended
    "jsdoc/implements-on-classes": 1, // Recommended
    "jsdoc/match-description": 1,
    "jsdoc/newline-after-description": 1, // Recommended
    "jsdoc/no-types": 0,
    "jsdoc/no-undefined-types": 1, // Recommended
    "jsdoc/require-description": 1,
    "jsdoc/require-description-complete-sentence": 1,
    "jsdoc/require-example": 0,
    "jsdoc/require-hyphen-before-param-description": 1,
    "jsdoc/require-jsdoc": 1, // Recommended
    "jsdoc/require-param": 1, // Recommended
    "jsdoc/require-param-description": 1, // Recommended
    "jsdoc/require-param-name": 1, // Recommended
    "jsdoc/require-param-type": 1, // Recommended
    "jsdoc/require-returns": 1, // Recommended
    "jsdoc/require-returns-check": 1, // Recommended
    "jsdoc/require-returns-description": 1, // Recommended
    "jsdoc/require-returns-type": 1, // Recommended
    "jsdoc/valid-types": 1, // Recommended
  },
};
