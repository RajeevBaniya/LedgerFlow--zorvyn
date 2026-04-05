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
| **Admin** | Seeded when the DB has **no users** yet | **`ADMIN_EMAIL`** and **`ADMIN_PASSWORD`** from `backend/.env`. This account **controls the app**: users, roles, records, and seeing how the full UI + API behave together. |
| **Viewer** | **Sign up** (`/signup` or `POST /api/auth/signup`) | The **email and password you chose** at signup. New accounts are always **VIEWER** (limited dashboard; no records list or trend charts). |
| **Analyst** | **No separate signup.** An **Admin** promotes a user **VIEWER → ANALYST** (Admin page or API). | **Same email/password** as that user; **log out and log in again** after the role change so the token shows **ANALYST** (records + full dashboard charts). |

### Example admin (matches `backend/README.md`)

If your `backend/.env` uses the same values as the backend docs, you can sign in on the UI with:

| | |
|--|--|
| **Email** | `admin@ledgerflow.com` |
| **Password** | `Admin@9988` |

Use this **admin** login to explore **all features**: dashboard (including charts), records, and **Admin → Users** to change roles and status. It is the account meant to **drive the whole app** end-to-end.


### Try the full flow (Viewer → Analyst)

1. **Sign up** a new user (e.g. `viewer-demo@example.com`) — that user is a **Viewer**. Log in as them to see the **restricted** UI (summary + activity only).
2. **Log out or login with admin** (login credentials above or you can setup in in your local .env).
3. Open **Admin**, find that user, and change their role from **VIEWER** to **ANALYST**.
4. **Log out**, then **log in again** as the same viewer email/password — you should see **records** and **dashboard charts** (Analyst experience).

More detail: `backend/README.md` → *Default admin* and *Trying VIEWER, ANALYST, and admin*.

## Notes

- **Business rules and permissions live in the backend.** The frontend only calls the API.
- **Role checks are server-side**; the UI reflects them but does not enforce security.
