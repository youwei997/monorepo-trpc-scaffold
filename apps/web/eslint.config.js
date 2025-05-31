import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import rootConfig from '../../eslint.config.js'; // 导入根目录配置

export default tseslint.config(
  ...rootConfig, // 继承根目录通用配置
  // React 特定配置
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
    rules: {
      'react/prop-types': 'off', // 使用 TypeScript 时通常禁用 prop-types
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
  }
);
