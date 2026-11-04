# User & Order Management

A Next.js application demonstrating user and order management with a PostgreSQL database, Prisma ORM, and a service layer.

**Project type:** Full-stack demonstration  
**ภาษาไทย:** โปรเจกต์ระบบจัดการผู้ใช้และคำสั่งซื้อ สำหรับแสดงการทำงานร่วมกันของหน้าเว็บ API และฐานข้อมูล

## Implemented scope

- Create, list, update, and delete users and orders.
- Associate orders with users.
- Store user roles and order status.
- Organize database operations behind service modules.
- Expose HTTP endpoints through Next.js route handlers.

A stored role value is part of the data model; it does not by itself provide authentication or access control.

## Stack

Next.js 16.1.3 · React 19 · TypeScript · Prisma 7 · PostgreSQL / Neon · Tailwind CSS 4

Exact dependencies and scripts are in [package.json](package.json).

## Run locally

Use a Node.js version supported by the installed Next.js and Prisma releases. Use a development Neon PostgreSQL database for the current `PrismaNeon` runtime adapter.

```bash
git clone https://github.com/Sonthep/nextjs-prisma-user-management.git
cd nextjs-prisma-user-management
npm ci
```

Create a local `.env` file:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

The connection string above is an example. Both `prisma.config.ts` and the runtime database module load `dotenv/config`.

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open http://localhost:3000/users and http://localhost:3000/orders.

### Optional sample data

The sample data script is [prisma/seed.cjs](prisma/seed.cjs). There is currently no `npm run seed` script. It uses the PostgreSQL adapter and imports `pg`, which is not declared directly in package.json; review that dependency before running `node prisma/seed.cjs`.

## Architecture

| Location | Responsibility |
| --- | --- |
| [app/users/](app/users/) | User management interface |
| [app/orders/](app/orders/) | Order management interface |
| [app/api/](app/api/) | HTTP route handlers |
| [lib/](lib/) | Prisma client and service modules |
| [prisma/schema.prisma](prisma/schema.prisma) | User and Order data models |
| [prisma/migrations/](prisma/migrations/) | Database migration history |
| [prisma.config.ts](prisma.config.ts) | Prisma datasource configuration |

Orders reference users through `userId`. The schema configures cascade deletion: deleting a user also deletes their related orders.

## API reference

| Resource | Collection | Individual record |
| --- | --- | --- |
| Users | `GET /api/users`, `POST /api/users` | `GET`, `PATCH`, `DELETE /api/users/[id]` |
| Orders | `GET /api/orders`, `POST /api/orders` | `GET`, `PATCH`, `DELETE /api/orders/[id]` |

Example request against a local development instance:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","role":"user"}'
```

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

These are verification commands, not a record of successful execution. The repository does not define an automated test script.

## Demo boundaries

The inspected user collection routes do not enforce authentication or authorization. The current database module also logs a prefix of the connection string for debugging. Review those behaviors before deploying with real accounts or data.

This repository demonstrates application structure and relational CRUD workflows; it is not presented as a production-ready administration system.

## Author

[Sonthep](https://github.com/Sonthep)
