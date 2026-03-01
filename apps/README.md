# apps

## Description

Application workspace containing deployable frontend and backend services.

## Features & Capabilities

### Core Purpose

This workspace delivers the full user-facing product surface: public-facing experience for discovery and onboarding, authenticated operations interfaces for day-to-day work, and business APIs that execute identity, patient, and clinical workflow logic.

### Key Features

- Unified product delivery: frontends and APIs are versioned and shipped together so business flows (login, records management, appointment handling) remain consistent across releases.
- Split audience experience: one app focuses on public marketing and account entry, while another app focuses on authenticated operational workflows.
- Domain-focused backend architecture: APIs are separated by business capability (auth, patients, medical histories) to keep ownership clear and changes safer.
- Shared security model: both frontend apps consume the same token/session flow, and backend services enforce privilege-based route protection.
- End-to-end workflow composition: creating and updating records in UI is mapped to typed API contracts and SDK calls that represent real business actions.

### User Flows / Primary Endpoints

- Public & onboarding flow: users land on `/` and `/about-us`, then move to `/login` or `/sign-up`.
- Authenticated operations flow: signed-in users navigate `/dashboard` to manage patients, acts, and appointments.
- Core backend entrypoints:
  - `/api/v1/auth` for authentication, user, and role workflows.
  - `/api/v1/patients` for patient lifecycle operations.
  - `/api/v1/medical-histories` for acts, medical history, and appointment workflows.

## Components

- [APIs/README.md](APIs/README.md): Express microservices (`auth`, `patients`, `medical-histories`, `test-api`)
- [client/README.md](client/README.md): Next.js app
- [dashboard/README.md](dashboard/README.md): Vite React app

## Documentation Links

- Root monorepo guide: [../README.md](../README.md)
- Packages index: [../packages/README.md](../packages/README.md)
- Nginx routing docs: [../nginx/README.md](../nginx/README.md)
- Dockerfiles docs: [../dockerfiles/README.md](../dockerfiles/README.md)
- Dev environment docs: [../dev-env/README.md](../dev-env/README.md)

## Scripts

No scripts are defined at this folder level; use root `turbo` scripts or component `package.json` scripts.

## Infrastructure

All apps are expected to run behind Nginx routing on `https://localhost:3000`.
