# Smartech - Full Stack Business Management App

A complete business management solution with invoicing, estimates, kanban board, user management, and notifications.

## Features

- **Home Page**: Welcome and overview
- **Services Page**: List of available services
- **Contact Page**: Contact form submission
- **Dashboard**: Overview of invoices, estimates, tasks, and users
- **Kanban Board**: Task management with drag-and-drop
- **Invoice Management**: Create and manage invoices
- **Estimates**: Generate professional estimates
- **User Management**: Manage team members
- **Notifications**: Real-time notifications

## Tech Stack

- **Frontend**: React 18 + Vite + React Router
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=postgresql://user:password@localhost:5432/smartech
PORT=5000
```

### Running Locally

```bash
npm run dev
```

This starts both frontend (http://localhost:5173) and backend (http://localhost:5000).

### Building for Production

```bash
npm run build
```

### Database Migrations

```bash
npm run migrate
```

## Deployment

This app is configured to deploy on Railway. The Dockerfile handles building and running the application.

## Project Structure

```
├── backend/          # Express API server
│   ├── src/
│   │   ├── index.ts  # Main server file
│   │   └── migrate.ts # Database migrations
│   └── package.json
├── frontend/         # React application
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── App.jsx   # Main app component
│   │   └── main.jsx  # Entry point
│   └── package.json
└── Dockerfile        # Production build
```

