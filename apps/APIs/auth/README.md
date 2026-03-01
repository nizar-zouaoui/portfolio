# @nizar-repo/auth

## Title & Description

Authentication and authorization API service. This service owns classic sign-in/sign-up, role management, user management, refresh-access-token issuance, and startup seeding of initial root credentials.

## Features & Capabilities

### Core Purpose

This service is the trust and access layer for the platform. It decides who can enter, what they can do, and how identity is represented consistently across the full product ecosystem.

### Key Features

- Classic account authentication: users can sign up and sign in with email/password and receive JWT access tokens for authenticated API usage.
- Token continuity: authenticated users can request refreshed access tokens without re-entering credentials.
- Role-based authorization model: roles carry granular `accessResources` privileges, enabling controlled access by resource and action.
- User lifecycle management: supports user creation, self-profile retrieval/update (`/users/me`), and admin-level user updates/deletions.
- Role lifecycle management: supports role creation, retrieval, updates, deletion, and explicit role assignment to users.
- Bootstrap and first-admin readiness: startup seed logic provisions default roles and root credentials from environment settings.

### User Flows / Primary Endpoints

- Primary business entities:
  - `Auth` credentials (`email`, `password`, auth method)
  - `User` identity/profile (`email`, `username`, `roleId`, `auths`)
  - `Role` permission container (`name`, `accessResources`)
- Primary endpoints:
  - `POST /auth/classic/login`, `POST /auth/classic/sign-up`
  - `GET /auth/refresh-access-token`
  - `GET/POST/PATCH/DELETE /roles/*` and `POST /roles/assign-role`
  - `GET/POST/PATCH/DELETE /users/*` and `GET/PATCH /users/me`

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- `@nizar-repo/custom-router` (async-safe router wrapper)
- `@nizar-repo/route-protection` (JWT auth middleware)
- `express-validator`, `cors`, `http-errors`

## Internal Dependencies

- `@nizar-repo/custom-router` -> [../../../packages/node/custom-router/README.md](../../../packages/node/custom-router/README.md)
- `@nizar-repo/route-protection` -> [../../../packages/node/route-protection/README.md](../../../packages/node/route-protection/README.md)
- `@nizar-repo/auth-types` -> [../../../packages/node/api-types/auth-types/README.md](../../../packages/node/api-types/auth-types/README.md)

## Environment Variables

| Variable            | Required        | Purpose                                                   | Format / Example                                            |
| ------------------- | --------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| `DATABASE_URI`      | yes             | MongoDB connection URI                                    | `mongodb://127.0.0.1:27017/portfolio-auth?authSource=admin` |
| `DATABASE_USER`     | yes             | MongoDB user used in connect options                      | `root`                                                      |
| `DATABASE_PASSWORD` | yes             | MongoDB password used in connect options                  | `password`                                                  |
| `PORT`              | optional        | service listen port (defaults `4001`)                     | `4001`                                                      |
| `JWT_SECRET_KEY`    | yes             | required signing secret for token generation/verification | secure string, >= 32 chars                                  |
| `JWT_EXPIRES_IN`    | optional        | JWT TTL from route-protection                             | `24h`                                                       |
| `JWT_ISSUER`        | optional        | issuer claim                                              | `medical-app`                                               |
| `JWT_AUDIENCE`      | optional        | audience claim                                            | `medical-app-users`                                         |
| `USER_EMAIL`        | yes for seeding | root seeded auth email                                    | `email@example.com`                                         |
| `USER_PASSWORD`     | yes for seeding | root seeded auth password                                 | `password`                                                  |
| `USER_USERNAME`     | yes for seeding | root seeded username                                      | `root`                                                      |

## Available Scripts

| Script  | Command                | What it does                 |
| ------- | ---------------------- | ---------------------------- |
| `start` | `nodemon src/index.ts` | launches API with hot reload |

## Routes (Base URL `/api/v1/auth`)

- `POST /auth/classic/login`
- `POST /auth/classic/sign-up`
- `GET /auth/refresh-access-token` (protected)
- `GET /roles/`, `POST /roles/`, `GET/PATCH/DELETE /roles/:id`, `POST /roles/assign-role` (protected)
- `GET /users/`, `POST /users/`, `GET/PATCH /users/me`, `GET/PATCH/DELETE /users/:id` (protected)

## Infrastructure & Deployment

- Default runtime port: `4001`.
- Nginx proxy: `/api/v1/auth` -> `http://host.docker.internal:4001`.
- On startup, after successful DB connect, imports `helpers/seed` to ensure base role/user/auth records are present.

Related infrastructure docs:

- Nginx proxy and TLS: [../../../nginx/README.md](../../../nginx/README.md)
- Docker image definitions: [../../../dockerfiles/README.md](../../../dockerfiles/README.md)
- Local compose environment: [../../../dev-env/README.md](../../../dev-env/README.md)

## Documentation Links

- APIs workspace index: [../README.md](../README.md)
- Root monorepo guide: [../../../README.md](../../../README.md)
- SDK consumer: [../../../packages/SDK/auth-sdk/README.md](../../../packages/SDK/auth-sdk/README.md)
