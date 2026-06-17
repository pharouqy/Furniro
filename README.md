# Furniro - Premium Furniture Store

E-commerce furniture application built with React, Vite, Tailwind CSS, and an Express.js backend with Chargily Pay payment integration.

## Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS 4, Zustand, React Router 7, FontAwesome
- **Backend**: Express 5, SQLite (better-sqlite3), JWT, bcrypt
- **Payment**: Chargily Pay (CIB / EDAHABIA)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Install dependencies

```bash
npm install
cd server && npm install && cd ..
```

### 2. Configure environment

```bash
cp server/.env server/.env.local
```

Edit `server/.env` and set your Chargily Pay **Secret Key** (get it from [pay.chargily.com](https://pay.chargily.com) → Developers Corner):

```
CHARGILY_API_KEY=test_sk_your_secret_key_here
```

### 3. Seed the database

```bash
cd server && node seed.js && cd ..
```

### 4. Start the app

Open **two terminals**:

```bash
# Terminal 1 - Backend API (port 3001)
npm run server

# Terminal 2 - Frontend (port 5173)
npm run dev
```

Visit **http://localhost:5173**

## Backoffice Admin

### Access

1. Go to **http://localhost:5173/admin/login**
2. Click **"Register"** and create your admin account
3. You are redirected to the dashboard

### Features

- **Orders list** with pagination and status filter
- **Change order status**: pending → paid → processing → shipped → delivered → cancelled
- **Delete orders**
- **Protected routes** (JWT authentication)

## Payment

- **Cash On Delivery** / Direct Bank Transfer: order created locally
- **Pay with CIB / EDAHABIA**: redirects to Chargily Pay secure page
- Webhook updates order status to `paid` automatically

## Project Structure

```
├── src/                    # Frontend React
│   ├── pages/              # Page components
│   ├── components/         # Shared UI components
│   ├── store/              # Zustand stores (cart, auth, likes)
│   ├── common/             # Hooks, utils, reusable components
│   └── router/             # Route configuration
├── server/                 # Backend Express
│   ├── routes/             # API routes
│   ├── middleware/          # Auth & error middleware
│   ├── db.js               # SQLite database
│   ├── seed.js             # Product seeder
│   └── index.js            # Entry point
└── public/                 # Static assets
```
