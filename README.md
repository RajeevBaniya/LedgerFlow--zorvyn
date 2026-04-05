# LedgerFlow

## Project overview

LedgerFlow is a **finance API** with **role-based access**: users keep income/expense records, see dashboard summaries and trends, and **admins** manage users and permissions.

**The backend is the main work in this repo.** The frontend is a small companion app for **visualization and manual testing**—not the core of the project.

## Features

### Authentication & RBAC

- JWT login and signup
- Roles: Viewer, Analyst, Admin (permissions enforced on the server)

### Financial records

- Create, read, update, delete (writes: **Admin** only)
- Filters, search, pagination
- Soft delete

### Dashboard APIs

- Summary: income, expense, net balance
- Category breakdown
- Monthly trends
- Weekly trends (ISO weeks)
- Recent activity

### User management

- Admin updates roles and account status
- Admins cannot strip their own **Admin** role via the API

## Tech stack

**Backend:** Node.js, Express, PostgreSQL (e.g. Neon), Prisma, JWT, bcrypt, Zod  

**Frontend:** React (Vite), Tailwind CSS, Recharts  

## Project structure

- **`backend/`** — API, auth, records, dashboard services, Prisma schema  
- **`frontend/`** — UI that calls the backend  

## Setup

**Backend**

```bash
cd backend
npm install
npx prisma db push
npm start
```

Runs at **http://localhost:5000** (see `backend/README.md` for `.env`).

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

## Login & roles (quick reference)

| Role | How you get it | What to use to sign in |
|------|------------------|-------------------------|
| **Admin** | Seeded when the DB has **no users** yet | **`ADMIN_EMAIL`** and **`ADMIN_PASSWORD`** from `backend/.env` (see `backend/.env.example`). This account **controls the app**: users, roles, records, permissions. |
| **Viewer** | **Sign up** (`/signup` or `POST /api/auth/signup`) | The **email and password you chose** at signup. New accounts are always **VIEWER**. |
| **Analyst** | **No separate signup.** An **Admin** changes a user’s role from **VIEWER → ANALYST** (Admin page or API). | **Same email/password** as that user; log in again after the role change so the token reflects **ANALYST**. |

**Do not commit real passwords.** Set `ADMIN_EMAIL` / `ADMIN_PASSWORD` only in local `.env` or your host’s environment (e.g. Render). More detail: `backend/README.md` → *Default admin*.

## Notes

- **Business rules and permissions live in the backend.** The frontend only calls the API.
- **Role checks are server-side**; the UI reflects them but does not enforce security.
