# apps

## Description

Application workspace containing deployable frontend and backend services.

## Components

- `APIs/`: Express microservices (`auth`, `patients`, `medical-histories`, `test-api`)
- `client/`: Next.js app
- `dashboard/`: Vite React app

## Scripts

No scripts are defined at this folder level; use root `turbo` scripts or component `package.json` scripts.

## Infrastructure

All apps are expected to run behind Nginx routing on `https://localhost:3000`.
