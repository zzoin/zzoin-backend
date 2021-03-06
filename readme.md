# ZZOIN BACKEND

> node version : 14.17

## Config .env

```.env
# app
NODE_ENV=development
PORT=5000
ADMIN_USER=...
ADMIN_PASSWORD=...
SECRET_KEY=...
DB_USERNAME=...
DB_PASSWORD=...
DB_HOST=localhost
DB_PORT=5433
DB_NAME=...

# db
POSTGRES_DB=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...

# db admin
PGADMIN_DEFAULT_EMAIL=...
PGADMIN_DEFAULT_PASSWORD=...
```

## Getting Started

아래의 단계를 따라 개발 서버를 시작합니다.

### 1. `.env` 파일 생성

notion 의 `환경 변수` 문서를 참고하여 `.env` 파일을 생성합니다.

### 2. DB Container

```bash
docker-compose up
```

PostgresQL 컨테이너를 띄웁니다.

### 3. DB Migration

```bash
npm run db:migrate
```

## Commands

### Prisma Studio

```bash
npm run db:studio
```

### Prisma DB 마이그레이션 생성

```bash
npx prisma migrate dev
```

새롭게 DB 마이그레이션을 생성합니다.

### Prisma 클라이언트 생성하기

```bash
npx prisma generate
```

Prisma 스키마의 변경사항이 생겼다면, 위 명령어로 Prisma 클라이언트를 다시 생성해야합니다.
