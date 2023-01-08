

## Table of Contents

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Database utils](#database-utils)
- [Tests](#tests)
- [Run Docker](#run-over-docker)

## Features

- [X] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [X] Seeding.
- [X] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [X] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer)).
- [X] Sign in and sign up via email.
- [X] Admin and User roles.
- [X] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [X] File uploads. Support local and Amazon S3 drivers.
- [X] Swagger.
- [X] E2E and units tests.
- [X] Docker.

## Quick run

```bash
git clone GIT_REPO
cd GIT_REPO
cp env-example .env
#config it
docker compose up -d
```

## Comfortable development

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run:

```bash
docker compose up -d postgres maildev redis
```

```bash
yarn

yarn migration:run

yarn seed:run

yarn start:dev
```

## Links

- Swagger: http://localhost:3000/docs
- Maildev: http://localhost:1080

## Database utils

Generate migration

```bash
yarn migration:generate -- src/database/migrations/CreateNameTable 
```

Run migration

```bash
yarn migration:run
```

Revert migration

```bash
yarn migration:revert
```

Drop all tables in database

```bash
yarn schema:drop
```

Run seed

```bash
yarn seed:run
```

## Tests

```bash
# e2e tests
sudo ./test-e2e.sh
```

## Run Over Docker

Required to have cloned backend and frontend with their respective names, at the same folder level

```bash
docker compose -f docker-compose.yaml --env-file env-example -p dev up --build --exit-code-from api
```
