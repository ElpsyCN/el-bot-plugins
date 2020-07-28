module.exports = {
  root: true,
  extends: ["prettier"],
  env: {
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2017,
  },
  overrides: [
    {
      files: ["*.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint/eslint-plugin"],
    },
  ],
};
