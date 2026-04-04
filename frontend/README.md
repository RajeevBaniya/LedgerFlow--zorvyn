# LedgerFlow — Frontend

## Overview

A simple UI to work with the **LedgerFlow** backend: dashboard, records, and admin screens so you can see how the API behaves without using Postman for everything.

The **backend is the main focus** of this repo. This app is here to try flows and visualize data.

## Tech stack

- React (Vite)
- Tailwind CSS
- Axios
- Recharts
- Lucide icons

## Features

- Login / signup
- Dashboard — summary, charts, recent activity
- Records — filter, search, pagination
- Admin — user role and status
- UI adapts by role (Viewer / Analyst / Admin)

## Setup

```bash
cd frontend
npm install
npm run dev
```

Start the backend first. By default the client calls `http://localhost:5000/api` (`src/api/axios.js`).
