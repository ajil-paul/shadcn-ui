import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import { fileURLToPath } from 'url';
import path from 'path';
import { readFile } from 'fs/promises';

// Get package.json as we're using ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

const baseConfig = {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    'class-variance-authority',
    'class-variance-authority/dist/types',
  ],
};

export default [
  {
    ...baseConfig,
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        entryFileNames: '[name].mjs',
      },
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        entryFileNames: '[name].cjs',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      }),
      terser(),
    ],
  },
  {
    ...baseConfig,
    output: [
      {
        dir: 'dist',
        format: 'esm',
      },
    ],
    plugins: [
      dts({
        compilerOptions: {
          paths: {
            '@base/*': ['./src/base/*'],
            '@lib/*': ['./src/lib/*'],
            '@components/*': ['./src/components/*'],
          },
        },
      }),
    ],
  },
];
