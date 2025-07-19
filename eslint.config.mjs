import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['**/*.d.ts'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json', ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      sonarjs,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      ...prettier.configs.recommended.rules,

      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-nested-ternary': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'sonarjs/no-duplicate-string': ['error', { threshold: 2 }],
    },
  },
];
