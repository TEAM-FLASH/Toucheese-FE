import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@store', replacement: '/src/store' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@tests', replacement: '/src/tests' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' },
    ],
  },
});