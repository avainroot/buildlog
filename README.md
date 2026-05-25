# Buildlog

Журнал строительных работ. Next.js + Prisma + SQLite.

## Требования

- Node.js 20+
- pnpm

## Локальный запуск

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка окружения

```bash
cp .env.example .env
```

При необходимости отредактируй `.env`.

### 3. Миграция базы данных

```bash
pnpm exec prisma migrate deploy
```

### 4. Заполнение начальными данными

```bash
pnpm exec prisma db seed
```

### 5. Запуск

```bash
# dev
pnpm dev

# prod
pnpm build && pnpm start
```

Приложение доступно по адресу `http://localhost:3000`.

---

## Запуск в Docker

### 1. Настройка окружения

```bash
cp .env.example .env
```

Для Docker переменная `NEXT_PUBLIC_API_BASE_URL` не нужна — она собирается автоматически из `PORT`.

### 2. Сборка и запуск

```bash
docker-compose up --build
```

Приложение доступно по адресу `http://localhost:${PORT}`.

Миграция и seed выполняются автоматически при старте контейнера.

### Остановка

```bash
docker-compose down
```

> База данных хранится в Docker volume и сохраняется между перезапусками.

---

## Переменные окружения

| Переменная | Описание | Пример |
|---|---|---|
| `DATABASE_URL` | Путь к SQLite базе | `file:./db/buildlog.db` |
| `PORT` | Порт приложения | `3000` |
| `NEXT_PUBLIC_API_BASE_URL` | URL API (только локально) | `http://localhost:3000/api` |