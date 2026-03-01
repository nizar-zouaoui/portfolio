# @nizar-repo/patients

## Title & Description

Patient domain API service responsible for patient data CRUD, paginated retrieval, and bulk patient insertion workflows.

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- `@nizar-repo/custom-router`
- `@nizar-repo/route-protection`
- `express-validator`, `cors`, `http-errors`, `libphonenumber-js`

## Internal Dependencies

- `@nizar-repo/custom-router`
- `@nizar-repo/patients-types`
- `@nizar-repo/medical-histories-sdk`
- `@nizar-repo/route-protection`
- `@nizar-repo/shared-types`

## Environment Variables

| Variable            | Required                   | Purpose                                                       | Format / Example                                                |
| ------------------- | -------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URI`      | yes                        | MongoDB connection URI                                        | `mongodb://127.0.0.1:27017/portfolio-patients?authSource=admin` |
| `DATABASE_USER`     | yes                        | MongoDB user used in connect options                          | `root`                                                          |
| `DATABASE_PASSWORD` | yes                        | MongoDB password used in connect options                      | `password`                                                      |
| `PORT`              | optional                   | service listen port (defaults `4000`, project example `4005`) | `4005`                                                          |
| `JWT_SECRET_KEY`    | yes (via route-protection) | validates bearer token on protected routes                    | secure string                                                   |
| `JWT_EXPIRES_IN`    | optional                   | JWT expiry configuration                                      | `24h`                                                           |
| `JWT_ISSUER`        | optional                   | issuer claim                                                  | `medical-app`                                                   |
| `JWT_AUDIENCE`      | optional                   | audience claim                                                | `medical-app-users`                                             |

## Available Scripts

| Script  | Command                                                | What it does                          |
| ------- | ------------------------------------------------------ | ------------------------------------- |
| `start` | `nodemon --exec ts-node -r dotenv/config src/index.ts` | starts API with TS runtime and dotenv |

## Routes (Base URL `/api/v1/patients`)

- `GET /patients/` (paginated/filter route, protected)
- `GET /patients/:id` (protected)
- `POST /patients/` (protected)
- `POST /patients/bulk` (protected)
- `PATCH /patients/:id` (protected)
- `DELETE /patients/:id` (protected)

## Infrastructure & Deployment

- Default runtime with `.env.example` is `PORT=4005`.
- Nginx proxy: `/api/v1/patients` -> `http://host.docker.internal:4005`.
