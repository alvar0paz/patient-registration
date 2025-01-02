# Patient Registration System

Full-stack application for patient registration with document upload capabilities.

## Stack

- Backend: Node.js/Express
- Frontend: React + TypeScript
- Database: MySQL
- Docker + pnpm

## Requirements

- Docker and Docker Compose
- Node.js 18+
- pnpm 8.9.0+ (`corepack enable && corepack prepare pnpm@8.9.0 --activate`)

## Quick Start

1. Clone and enter the project:

```bash
git clone <git@github.com:alvar0paz/patient-registration.git>
cd patient-registration
```

2. Start with Docker:

```bash
docker-compose up --build
```

3. Access the applications:

- App: http://localhost:5173
- API: http://localhost:3000
- Mail Testing: http://localhost:8025

## Local Development

Instead of running everything in Docker, you can:

1. Start required services:

```bash
docker-compose up mysql mailhog
```

2. Start the backend:

```bash
cd backend
pnpm install
pnpm dev
```

3. Start the frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

## Features

- Patient registration with validation
- Document photo upload
- Email notifications (using MailHog for development)
- Responsive design
- Local storage integration

## API Routes

- POST /api/patients - Register patient
- GET /api/patients - List patients

## Environment Variables

### Backend (.env)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3307
DB_USER=user
DB_PASSWORD=password
DB_NAME=patients_db
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Create a Pull Request

## License

MIT
