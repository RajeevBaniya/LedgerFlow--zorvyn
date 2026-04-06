# LedgerFlow — Backend

## Overview

LedgerFlow is a small finance API: users keep **income and expense records**, pull **dashboard aggregates**, and **admins** manage who can see or change what.

It shows how to structure a money backend: **correct amounts**, **clear permissions**, and **dashboard reads** that don’t force the client to sum raw rows.

**Why roles matter here:** finance data is sensitive. The API decides what each caller may do. The UI is not the source of truth for permissions.

---

## What this project demonstrates

Built as an **assignment / evaluation** piece, not a full product. The focus is on:

- **Layered backend design** — HTTP surface separated from rules and from the database.
- **Role-based access control** — enforced on the server for every protected route.
- **Handling money without floating-point mistakes** — integer storage, string amounts at the boundary.
- **Aggregation** — dashboard endpoints that summarize data instead of only exposing CRUD.

A **minimal frontend** ships with the repo for trying the API by hand; the write-up here is **backend-first**.

---

## Tech stack

- **Node.js** + **Express** (ES modules)
- **PostgreSQL** (works well with **Neon**)
- **Prisma** (ORM, schema in `prisma/schema.prisma`)
- **JWT** (`jsonwebtoken`) for authenticated requests
- **bcrypt** for password hashing
- **Zod** for request validation

---

## Architecture

Traffic flows in one direction: **routes → middleware → controllers → services → Prisma → PostgreSQL**.

- **Routes** — Wire URLs, attach `authMiddleware`, `authorizeRoles`, and Zod validation in a fixed order. No business rules.
- **Controllers** — Read `req`, call a service, return JSON (`{ success, data }` / errors via `next`). **No Prisma here.**
- **Services** — Business rules, queries, and orchestration. **All Prisma calls live in services.**
- **Middleware** — JWT verification, role checks, validation, global error formatting.
- **Validators** — Zod schemas only; kept separate from route files where practical.

---

## Core features

### Authentication

- **Signup** — creates users; role is always **VIEWER** (not taken from arbitrary client fields for auth decisions).
- **Login** — returns a JWT; **inactive** users are rejected.
- **Admin seed** — first admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` if no user exists yet (`src/config/init.js`).
- **Rate limit** on login — basic protection against brute-force attempts (`src/config/rateLimit.js`).

### Role-based access control

| Role | What they get |
|------|----------------|
| **VIEWER** | Dashboard summary and recent activity only. No record list, no category/trend insights. |
| **ANALYST** | Read records (with filters/pagination), full dashboard insights (categories, monthly & weekly trends). No record mutations. |
| **ADMIN** | Everything above plus create/update/delete records and user management. |

Enforced with **`authMiddleware`** + **`authorizeRoles`** on routes. The JWT carries **role** for convenience, but **permission checks are server-side**; you don’t promote yourself by editing the token client-side.

### Financial records

- **Create / read / update / delete** (delete is **soft**: `deletedAt` set; lists and aggregates ignore deleted rows).
- **Filters** — type, category, date range, **search** on category and note (case-insensitive).
- **Pagination** — `page` / `limit` with totals in `meta`.

### Dashboard APIs

- **Summary** — total income, total expense, net balance.
- **Category breakdown** — totals per category.
- **Monthly trends** — income vs expense per calendar month (UTC).
- **Weekly trends** — income vs expense per **ISO week** (`YYYY-Www`, UTC).
- **Recent activity** — latest rows for a quick feed.

### User management (admin)

- List users (no password fields).
- Change **role** and **status** (active/inactive).
- **Guardrail** — an admin cannot remove their own **ADMIN** role via the API.

---

## Important design decisions

- **Money in paise as `BigInt` in the database** — avoids float rounding. The API accepts amounts as **decimal strings** (e.g. `"99.50"`) and returns them the same way so JSON stays predictable.
- **Soft delete** — `Record.deletedAt`; lists and dashboard aggregates ignore deleted rows.
- **Login rate limiting** — `POST /api/auth/login` is throttled (`src/config/rateLimit.js`).
- **RBAC in middleware** — enforced on routes instead of ad hoc checks in controllers.
- **Validation before services** — Zod failures return **400** with a stable error shape; unexpected errors use the central error handler.

---

## Setup instructions

1. Clone the repo and open the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create **`.env`** in `backend/` (see below). Use a real `DATABASE_URL` and a long random `JWT_SECRET`.
4. Apply the schema:
   ```bash
   npx prisma db push
   ```
5. Start the API:
   ```bash
   npm start
   ```

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `PORT` | HTTP port (defaults depend on `server.js`; often `5000`). |
| `DATABASE_URL` | PostgreSQL connection string (SSL for Neon). |
| `JWT_SECRET` | Secret for signing tokens (**required**). |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `1d`). **Required** for signing config. |
| `ADMIN_EMAIL` | Seed admin user email if the DB has no users yet. |
| `ADMIN_PASSWORD` | Seed admin password when the user table is empty. |

Never commit `.env`.

---

## Default admin 

`ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` define the **master admin** for this app. start and login as **ADMIN** so the system can manage users (roles, active/inactive) and access; that first account comes from these variables instead of a signup form.

**This admin acts as the initial system controller to manage users and permissions.**

The first time you start the server with an **empty user table**, `src/config/init.js` creates that admin from `.env`. After any user exists, that step **does not run again**. Log in with this account to run the app and manage users.

Example `.env`:

```env
ADMIN_EMAIL=admin@ledgerflow.com
ADMIN_PASSWORD=Admin@9988
```

Log in:

```http
POST /api/auth/login
Content-Type: application/json

{"email":"admin@ledgerflow.com","password":"Admin@9988"}
```

Use `data.token` as `Authorization: Bearer <token>` on protected routes.

---

## Trying VIEWER, ANALYST, and admin

**VIEWER — sign up, then sign in**

`POST /api/auth/signup` always creates a **VIEWER** account. After you log in with that email and password, the app only exposes what VIEWERs get: **dashboard summary and recent activity** (no record list, no category or trend charts). Use that flow when you want to see the restricted experience.

**ANALYST — promotion**

A **VIEWER** does not gain records or insights on their own. An **ADMIN** must change their role to **ANALYST** (Admin UI or `PATCH /api/users/:id/role`). After that, the same user can **read records** and use the **full dashboard** (categories, monthly/weekly trends) the next time they use a fresh token (log in again if the client caches the old role).

Role updates are currently synced on reload using the `/me` endpoint. For real-time updates, this can be extended using polling or websocket-based event systems, but was kept simple here to avoid unnecessary complexity.

**ADMIN — seeded account**

To act as admin, log in with **`ADMIN_EMAIL`** and **`ADMIN_PASSWORD`** from `.env` (same values as in **Default admin (local setup)** above). That account can manage users, records, and roles.

---

## API overview

All app APIs are under **`/api`**. Protected routes expect:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

Rough map:

- **`/api/auth`** — signup, login, `me`
- **`/api/records`** — CRUD + list with filters/pagination (roles restricted)
- **`/api/dashboard`** — summary, activity, categories, monthly trends, **weekly** trends
- **`/api/users`** — admin user list and role/status updates

Success payloads generally look like `{ "success": true, "data": { ... } }`; list responses may include `meta` for pagination.

---

## Notes

- Frontend is included for manual testing; the backend is the main focus of this project.
- **Ownership model** — records and dashboard stats are scoped to the **authenticated user**. Admin does not aggregate all users’ data in this version.

---

## License / use

Suitable for portfolio or coursework. Adjust license to match your institution or employer.
