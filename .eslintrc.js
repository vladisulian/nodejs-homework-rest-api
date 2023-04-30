module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true, // added for test working
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
