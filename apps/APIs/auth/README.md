# @nizar-repo/auth

## Title & Description

Authentication and authorization API service. This service owns classic sign-in/sign-up, role management, user management, refresh-access-token issuance, and startup seeding of initial root credentials.

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- `@nizar-repo/custom-router` (async-safe router wrapper)
- `@nizar-repo/route-protection` (JWT auth middleware)
- `express-validator`, `cors`, `http-errors`

## Internal Dependencies

- `@nizar-repo/custom-router`
- `@nizar-repo/route-protection`
- `@nizar-repo/auth-types`

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
