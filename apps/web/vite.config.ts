import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@monorepo-trpc-scaffold/shared': path.resolve(
        __dirname,
        '../../packages/shared/src'
      ),
    },
  },
});
