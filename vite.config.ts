import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@base': path.resolve(__dirname, './src/base'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
