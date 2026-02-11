# Naveen Vasamsetti Portfolio Project

Personal portfolio built with React (Frontend) and Express/Prisma (Backend).

## Project Structure

```
my-portfolio/
├── frontend/             # React + Vite + Tailwind UI
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── backend/              # Express.js 
│   ├── src/              # API controllers and routes
│   ├── prisma/           # Database schema
│   └── package.json      # Backend dependencies
└── package.json          # Root scripts for management
```

## Getting Started

### 1. Installation

Install root dependencies (for `concurrently`) and all project dependencies:

```bash
npm install
npm run install:all
```

### 2. Environment Setup

Make sure you have a `.env` file in the `backend/` directory with:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT` (default 3000)

### 3. Running the Project

Run both frontend and backend simultaneously:

```bash
npm run dev
```

Or individually:

- Frontend: `npm run dev:frontend`
- Backend: `npm run dev:backend`


