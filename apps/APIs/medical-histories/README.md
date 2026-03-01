# @nizar-repo/medical-histories

## Title & Description

Medical histories domain API service managing acts catalog, medical history records, and appointment lifecycle operations.

## Features & Capabilities

### Core Purpose

This service records treatment activity over time. It links clinical procedures, appointment timelines, and payment progression into a coherent history that can be reviewed and updated as care evolves.

### Key Features

- Acts/procedures catalog management: supports creation and maintenance of billable or trackable acts with pricing and optional descriptions.
- Medical history container management: creates and retrieves per-patient medical history aggregates that organize appointment references.
- Appointment lifecycle operations: supports creating, updating, retrieving, and deleting appointment events with associated acts, notes, and dates.
- Financial state tracking: appointment records capture payment status (`PAID`, `PENDING`, `FREE`) to support operational follow-up.
- Relational consistency logic: appointment create/delete operations push/pull identifiers from medical history records to keep links synchronized.
- Query-ready retrieval patterns: aggregation pipelines support paginated medical-history appointment retrieval for UI tables and workflow navigation.

### User Flows / Primary Endpoints

- Primary business entities:
  - `Act` (`name`, `price`, optional `description`)
  - `MedicalHistory` (`appointmentIds` linkage list)
  - `Appointment` (`acts`, `date`, `notes`, `confirmedPrice`, `paymentStatus`)
- Primary endpoints:
  - Acts: `GET/POST/PATCH/DELETE /acts/*`
  - Medical histories: `GET /medical-histories/:id`, `POST /medical-histories/`, `DELETE /medical-histories/:id`
  - Appointments: `GET /appointments/:id`, `POST /appointments/:medicalHistoryId`, `PATCH /appointments/:id`, `DELETE /appointments/:id`

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
