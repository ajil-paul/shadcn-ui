import path from 'path';

import { defineConfig } from 'vitest/config';
import { GithubReporter } from 'vitest-github-action';

export default defineConfig({
  resolve: {
    alias: {
      '@base': path.resolve(__dirname, './src/base'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ['default', new GithubReporter()]
      : 'default',
  },
});
