module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // 集成 Prettier
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error", // 将 Prettier 问题作为 ESLint 错误
    "no-unused-vars": "warn", // 示例规则，可根据需要调整
  },
  // 如果使用 TypeScript 或 React，可以添加以下配置
  parser: "@typescript-eslint/parser",
  extends: ["plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  plugins: ["react", "@typescript-eslint"],
};
