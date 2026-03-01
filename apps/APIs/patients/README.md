# @nizar-repo/patients

## Title & Description

Patient domain API service responsible for patient data CRUD, paginated retrieval, and bulk patient insertion workflows.

## Features & Capabilities

### Core Purpose

This service is the source of truth for patient identity and contact records. It enables staff to maintain reliable patient profiles that downstream clinical workflows depend on.

### Key Features

- Patient master records: stores and manages full name, phone, birth date, optional email, and linked medical history identifier.
- Paginated patient discovery: list endpoints support query-driven pagination to keep large patient registries manageable in operational UIs.
- Full lifecycle operations: supports create, retrieve, update, and delete actions for individual patient records.
- Bulk registration support: allows multi-record insertion to accelerate onboarding from external lists or migration files.
- Data consistency safeguards: schema-level uniqueness and duplicate-error handling reduce accidental duplicate patient entries.
- Cross-service workflow integration: patient creation automatically provisions a medical history record via the medical-histories SDK and persists the relationship.

### User Flows / Primary Endpoints

- Primary business entity:
  - `Patient` with identity/contact fields and `medicalHistoryId` linkage.
- Primary endpoints:
  - `GET /patients/` (paginated listing/search)
  - `GET /patients/:id` (single patient retrieval)
  - `POST /patients/` (create patient + link medical history)
  - `POST /patients/bulk` (bulk create)
  - `PATCH /patients/:id` (update patient)
  - `DELETE /patients/:id` (remove patient)

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- `@nizar-repo/custom-router`
- `@nizar-repo/route-protection`
- `express-validator`, `cors`, `http-errors`, `libphonenumber-js`

## Internal Dependencies

- `@nizar-repo/custom-router` -> [../../../packages/node/custom-router/README.md](../../../packages/node/custom-router/README.md)
- `@nizar-repo/patients-types` -> [../../../packages/node/api-types/patients-types/README.md](../../../packages/node/api-types/patients-types/README.md)
- `@nizar-repo/medical-histories-sdk` -> [../../../packages/SDK/medical-histories-sdk/README.md](../../../packages/SDK/medical-histories-sdk/README.md)
- `@nizar-repo/route-protection` -> [../../../packages/node/route-protection/README.md](../../../packages/node/route-protection/README.md)
- `@nizar-repo/shared-types` -> [../../../packages/node/shared-types/README.md](../../../packages/node/shared-types/README.md)

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

Related infrastructure docs:

- Nginx proxy and TLS: [../../../nginx/README.md](../../../nginx/README.md)
- Docker image definitions: [../../../dockerfiles/README.md](../../../dockerfiles/README.md)
- Local compose environment: [../../../dev-env/README.md](../../../dev-env/README.md)

## Documentation Links

- APIs workspace index: [../README.md](../README.md)
- Root monorepo guide: [../../../README.md](../../../README.md)
- SDK consumers: [../../../packages/SDK/patients-sdk/README.md](../../../packages/SDK/patients-sdk/README.md), [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md)
