# Galaxy Aura 🌌

A premium crystal sphere lamp e-commerce store built with React, TypeScript, Express, and tRPC.

## Features

- 🛍️ Full e-commerce storefront (shop, product pages, cart, checkout)
- 👤 User accounts with order history and wishlist
- 🔐 JWT-based authentication with role-based access (admin / user)
- 🛠️ Admin dashboard (products, orders, settings)
- 🌙 Dark/light theme
- 📱 Fully responsive

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Wouter
- **Backend:** Express.js, tRPC, Drizzle ORM (MySQL)
- **Auth:** JWT cookies via jose
- **UI:** shadcn/ui components

## Local Development

### Prerequisites
- Node.js 18+
- pnpm

### Setup

```bash
pnpm install
```

Create a `.env` file in the root:

```env
JWT_SECRET=your-secret-key

# Optional: connect a MySQL database
# DATABASE_URL=mysql://user:password@localhost:3306/galaxy_aura

# Admin credentials (no DB required)
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin

# Test user credentials (no DB required)
USER_EMAIL=user@user.com
USER_PASSWORD=user
```

### Run

```bash
pnpm dev
```

App runs on [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)

Set the following environment variables in Vercel:

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `DATABASE_URL` | MySQL database connection string |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

## Project Structure

```
├── client/         # React frontend (Vite)
├── server/         # Express backend (tRPC)
├── shared/         # Shared types and constants
├── drizzle/        # Database schema and migrations
└── api/            # Vercel serverless entry point
```
