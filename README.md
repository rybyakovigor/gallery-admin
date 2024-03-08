# Админ панель Онлайн-Галереи

Приложение развернуто на [Vite React](https://vitejs.dev/guide/) версия `5.1.4`

## Установка зависимостей

```bash
$ yarn install
```

## Запуск приложения

```bash
# development
$ yarn dev

# build
$ yarn build

# preview mode
$ yarn preview
```

## Проверка качества кода

```bash
# Check
$ check:all
$ check:lint
$ check:prettier
$ check:stylelint
$ check:types

#Fix
$ fix:all
$ fix:lint
$ fix:prettier
$ fix:stylelint
```

Перед коммитом запускается husky и происходит проверка/исправление по возможности с помощью всех линтеров. Также проверяется шаблон на текст коммита.

```bash
chore: run tests on travis ci
fix(server): #13 send cors headers
feat(blog): #42 add comment section
```

## Репозиторий
В репозитории 2 основные ветки: `master` и `develop`. Разработка ведется через создание веток от `develop`. `Master` - ветка для прода.
