import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 忽略文件
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },
  // 通用配置，适用于所有 .js/.ts/.tsx 文件
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig, // 禁用与 Prettier 冲突的规则
      'plugin:prettier/recommended', // 集成 Prettier
    ],
    rules: {
      'prettier/prettier': 'error', // 将 Prettier 问题作为 ESLint 错误
      'no-unused-vars': 'warn', // 示例通用规则
      '@typescript-eslint/no-unused-vars': ['warn'], // TypeScript 特定规则
    },
  }
);
