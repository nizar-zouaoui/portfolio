# APIs Workspace

## Description

This folder contains the backend Express services for the monorepo. Each service runs independently with its own MongoDB database and is mounted behind Nginx under `/api/v1/*` paths.

## Components

- `auth`: authentication, user, and role management (`/api/v1/auth`).
- `patients`: patient CRUD and bulk import-style operations (`/api/v1/patients`).
- `medical-histories`: acts, medical histories, and appointments (`/api/v1/medical-histories`).
- `test-api`: small validation/CRUD test surface (`/api/v1/test-api`).

## Infrastructure & Routing

- Nginx proxies:
  - `/api/v1/auth` -> `http://host.docker.internal:4001`
  - `/api/v1/patients` -> `http://host.docker.internal:4005`
  - `/api/v1/medical-histories` -> `http://host.docker.internal:4006`
- All APIs use `@nizar-repo/custom-router` and (except `test-api`) use `@nizar-repo/route-protection` JWT-based authorization.

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
