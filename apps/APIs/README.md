# APIs Workspace

## Description

This folder contains the backend Express services for the monorepo. Each service runs independently with its own MongoDB database and is mounted behind Nginx under `/api/v1/*` paths.

## Features & Capabilities

### Core Purpose

This workspace provides the product’s business engine. It handles identity and permissions, stores core operational records, and exposes the API actions that frontend users trigger when they create accounts, manage patients, and process medical workflows.

### Key Features

- Capability-oriented service design: each API owns a clear business domain (`auth`, `patients`, `medical-histories`) to reduce coupling and simplify maintenance.
- Role- and privilege-aware access control: protected routes require JWT-backed authorization and resource-specific permissions.
- Data ownership by domain: each service persists to its own MongoDB database, enabling independent scaling and safer schema evolution.
- Typed integration model: internal SDK and type packages align request/response contracts between frontend and backend.
- Operational extensibility: `test-api` provides a lightweight sandbox route set for validating middleware, validators, and CRUD behavior outside core domains.

### User Flows / Primary Endpoints

- Identity flow endpoints (`/api/v1/auth`):
  - sign-in / sign-up (`/auth/classic/login`, `/auth/classic/sign-up`)
  - token renewal (`/auth/refresh-access-token`)
  - user and role administration (`/users/*`, `/roles/*`)
- Patient flow endpoints (`/api/v1/patients`):
  - patient listing, retrieval, creation, updates, deletion, and bulk ingest.
- Clinical workflow endpoints (`/api/v1/medical-histories`):
  - acts catalog (`/acts/*`), medical history retrieval/creation/deletion, appointment lifecycle (`/appointments/*`).

## Components

- [auth/README.md](auth/README.md): authentication, user, and role management (`/api/v1/auth`).
- [patients/README.md](patients/README.md): patient CRUD and bulk import-style operations (`/api/v1/patients`).
- [medical-histories/README.md](medical-histories/README.md): acts, medical histories, and appointments (`/api/v1/medical-histories`).
- [test-api/README.md](test-api/README.md): small validation/CRUD test surface (`/api/v1/test-api`).

## Infrastructure & Routing

- Nginx proxies:
  - `/api/v1/auth` -> `http://host.docker.internal:4001`
  - `/api/v1/patients` -> `http://host.docker.internal:4005`
  - `/api/v1/medical-histories` -> `http://host.docker.internal:4006`
- All APIs use `@nizar-repo/custom-router` and (except `test-api`) use `@nizar-repo/route-protection` JWT-based authorization.

Related package docs:

- `@nizar-repo/custom-router` -> [../../packages/node/custom-router/README.md](../../packages/node/custom-router/README.md)
- `@nizar-repo/route-protection` -> [../../packages/node/route-protection/README.md](../../packages/node/route-protection/README.md)
- API domain types -> [../../packages/node/README.md](../../packages/node/README.md)

## Documentation Links

- Apps index: [../README.md](../README.md)
- Root monorepo guide: [../../README.md](../../README.md)
- Nginx routing docs: [../../nginx/README.md](../../nginx/README.md)
- Dev environment docs: [../../dev-env/README.md](../../dev-env/README.md)

## Environment Variables

Common API variables are inherited from repository root `.env` and service `.env.example` files:

| Variable            | Used By                 | Purpose                                                  | Format / Example                                            |
| ------------------- | ----------------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| `DATABASE_USER`     | all APIs                | MongoDB auth username passed to Mongoose connect options | `root`                                                      |
| `DATABASE_PASSWORD` | all APIs                | MongoDB auth password passed to Mongoose connect options | `password`                                                  |
| `DATABASE_URI`      | each API                | MongoDB connection string for that service DB            | `mongodb://127.0.0.1:27017/portfolio-auth?authSource=admin` |
| `PORT`              | each API                | HTTP listen port                                         | `4001`, `4005`, `4006`, `4000`                              |
| `JWT_SECRET_KEY`    | auth + route-protection | signing/verifying JWTs (required, >= 32 chars)           | long secret string                                          |
| `JWT_EXPIRES_IN`    | route-protection        | token expiry override                                    | `24h`                                                       |
| `JWT_ISSUER`        | route-protection        | token issuer claim                                       | `medical-app`                                               |
| `JWT_AUDIENCE`      | route-protection        | token audience claim                                     | `medical-app-users`                                         |
| `USER_EMAIL`        | auth seed               | seeded root auth email                                   | `email@example.com`                                         |
| `USER_PASSWORD`     | auth seed               | seeded root auth password                                | `password`                                                  |
| `USER_USERNAME`     | auth seed               | seeded root user username                                | `root`                                                      |

## Scripts

Each service currently exposes:

| Script  | Command                                                                  | Behavior                                           |
| ------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| `start` | `nodemon --exec ts-node -r dotenv/config src/index.ts` (or auth variant) | starts service with auto-reload and dotenv loading |
