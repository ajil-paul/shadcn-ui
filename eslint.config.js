import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import storybookPlugin from 'eslint-plugin-storybook';
import globals from 'globals';

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'storybook-static/**',
      '**/*.test.*',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      prettier: prettierPlugin,
      storybook: storybookPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in imports (come from NodeJS)
            'external', // External imports
            'internal', // Absolute imports
            ['sibling', 'parent'], // Relative imports
            'index', // index imports
            'unknown', // unknown
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@*/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 80,
          tabWidth: 2,
        },
      ],
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      'storybook/default-exports': 'error',
    },
  },
];
