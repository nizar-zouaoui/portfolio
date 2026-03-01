# @nizar-repo/medical-histories

## Title & Description

Medical histories domain API service managing acts catalog, medical history records, and appointment lifecycle operations.

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- `@nizar-repo/custom-router`
- `@nizar-repo/route-protection`
- `express-validator`, `cors`, `http-errors`, `libphonenumber-js`

## Internal Dependencies

- `@nizar-repo/custom-router`
- `@nizar-repo/medical-histories-types`
- `@nizar-repo/route-protection`
- `@nizar-repo/shared-types`

## Environment Variables

| Variable            | Required                   | Purpose                                                       | Format / Example                                                         |
| ------------------- | -------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `DATABASE_URI`      | yes                        | MongoDB connection URI                                        | `mongodb://127.0.0.1:27017/portfolio-medical-histories?authSource=admin` |
| `DATABASE_USER`     | yes                        | MongoDB user used in connect options                          | `root`                                                                   |
| `DATABASE_PASSWORD` | yes                        | MongoDB password used in connect options                      | `password`                                                               |
| `PORT`              | optional                   | service listen port (defaults `4000`, project example `4006`) | `4006`                                                                   |
| `JWT_SECRET_KEY`    | yes (via route-protection) | validates bearer token on protected routes                    | secure string                                                            |
| `JWT_EXPIRES_IN`    | optional                   | JWT expiry configuration                                      | `24h`                                                                    |
| `JWT_ISSUER`        | optional                   | issuer claim                                                  | `medical-app`                                                            |
| `JWT_AUDIENCE`      | optional                   | audience claim                                                | `medical-app-users`                                                      |

## Available Scripts

| Script  | Command                                                | What it does                          |
| ------- | ------------------------------------------------------ | ------------------------------------- |
| `start` | `nodemon --exec ts-node -r dotenv/config src/index.ts` | starts API with TS runtime and dotenv |

## Routes (Base URL `/api/v1/medical-histories`)

- Acts:
  - `GET /acts/`, `GET /acts/:id`, `POST /acts/`, `PATCH /acts/:id`, `DELETE /acts/:id`
- Medical Histories:
  - `GET /medical-histories/:id`, `POST /medical-histories/`, `DELETE /medical-histories/:id`
- Appointments:
  - `GET /appointments/:id`, `POST /appointments/:medicalHistoryId`, `PATCH /appointments/:id`, `DELETE /appointments/:id`

All routes are protected using `protectRoute(...)` with resource/privilege checks.

## Infrastructure & Deployment

- Default runtime with `.env.example` is `PORT=4006`.
- Nginx proxy: `/api/v1/medical-histories` -> `http://host.docker.internal:4006`.
