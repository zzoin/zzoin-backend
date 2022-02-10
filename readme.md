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
npx prisma migrate dev
```

DB 마이그레이션을 합니다.

## Commands

### Prisma Studio

```bash
npx prisma studio
```
