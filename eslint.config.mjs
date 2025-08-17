import tseslint from '@typescript-eslint/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';

export default [
  { ignores: ['**/*.d.ts'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json', ecmaVersion: 'latest', sourceType: 'module' },
      globals: {
        React: true, // если JSX без импорта React
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'sort-destructure-keys': sortDestructureKeys,
      sonarjs,
      prettier,
    },
    settings: {
      react: {
        version: 'detect', // автоматически определяет версию React
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      ...prettier.configs.recommended.rules,

      // Переопределенные правила:
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-nested-ternary': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'sonarjs/no-duplicate-string': ['error', { threshold: 2 }],

      'react/jsx-sort-props': [
        'warn',
        { callbacksLast: true, shorthandFirst: true, noSortAlphabetically: false, reservedFirst: true },
      ],

      'sort-destructure-keys/sort-destructure-keys': ['warn', { caseSensitive: true }],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React
            ['^react$', '^react-router-dom'],

            // Сторонние зависимости
            ['^@?\\w'],

            // Абсолютные импорты из проекта
            ['^~/infra/.*$'],
            ['^~/data/.*/types/.*$'],
            ['^~/data/.*$'],
            ['^~/domain/.*$'],
            ['^~/ui/assets/.*$'],
            ['^~/ui/components/.*$'],
            ['^~/ui/hooks/.*$'],
            ['^~/ui/layouts/.*$'],
            ['^~/ui/providers/.*$'],
            ['^~/ui/utils$', '^@/ui/utils/.*$'],
            ['^~/ui/styles/.*$'],
            ['^~/ui/.*$'],

            // Остальные абсолютные импорты с `~`
            ['^~'],

            // Относительные импорты: сначала родительские, потом текущие
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // ../
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // ./

            // CSS (всегда в конце)
            ['\\.css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Отключаем другие конфликтующие правила
      'import/order': 'off',
      'sort-imports': 'off',
      'prettier/prettier': 'off',
    },
  },
];
