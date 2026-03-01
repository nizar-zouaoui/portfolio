# @nizar-repo/test-api

## Title & Description

`test-api` is a lightweight test service exposing a simple CRUD route set used for API validation and development checks.

## Features & Capabilities

### Core Purpose

This service acts as a controlled sandbox for development and quality checks. It gives teams a minimal but real API surface to validate connectivity, middleware behavior, request validation, and CRUD workflows without touching production-critical business entities.

### Key Features

- Minimal end-to-end CRUD contract: provides a complete create/read/update/delete cycle around a simple `playerName` model.
- Fast integration smoke testing: useful for verifying SDK wiring, route registration, and API reachability in local or CI environments.
- Validator and controller pipeline verification: demonstrates the same route -> validator -> controller -> service layering used by larger services.
- Low-risk experimentation area: enables rapid testing of generic infrastructure changes (error handling, middleware, TS runtime behavior) with minimal domain complexity.

### User Flows / Primary Endpoints

- Primary business entity:
  - `Tester` record with `playerName`.
- Primary endpoints:
  - `GET /` list test records
  - `GET /:id` get one test record
  - `POST /` create test record
  - `PUT /:id` update test record
  - `DELETE /:id` delete test record

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- `@nizar-repo/custom-router`
- `express-validator`, `cors`, `http-errors`

## Internal Dependencies

- `@nizar-repo/custom-router` -> [../../../packages/node/custom-router/README.md](../../../packages/node/custom-router/README.md)
- `@nizar-repo/route-protection` -> [../../../packages/node/route-protection/README.md](../../../packages/node/route-protection/README.md) (declared dependency)
- `@nizar-repo/auth-types` -> [../../../packages/node/api-types/auth-types/README.md](../../../packages/node/api-types/auth-types/README.md)
- `@nizar-repo/shared-types` -> [../../../packages/node/shared-types/README.md](../../../packages/node/shared-types/README.md)

## Environment Variables

| Variable            | Required | Purpose                                  | Format / Example                                                |
| ------------------- | -------- | ---------------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URI`      | yes      | MongoDB connection URI                   | `mongodb://127.0.0.1:27017/portfolio-test-api?authSource=admin` |
| `DATABASE_USER`     | yes      | MongoDB user used in connect options     | `root`                                                          |
| `DATABASE_PASSWORD` | yes      | MongoDB password used in connect options | `password`                                                      |
| `PORT`              | optional | service listen port (defaults `4000`)    | `4000`                                                          |

## Available Scripts

| Script  | Command                                                | What it does                          |
| ------- | ------------------------------------------------------ | ------------------------------------- |
| `start` | `nodemon --exec ts-node -r dotenv/config src/index.ts` | starts API with TS runtime and dotenv |

## Routes (Base URL `/api/v1/test-api`)

- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

## Infrastructure & Deployment

- Runtime defaults to port `4000`.
- No active Nginx mapping is configured for `/api/v1/test-api` in `nginx/conf.d/default.conf` (service is runnable directly and can be mapped when needed).

Related infrastructure docs:

- Nginx proxy and TLS: [../../../nginx/README.md](../../../nginx/README.md)
- Docker image definitions: [../../../dockerfiles/README.md](../../../dockerfiles/README.md)
- Local compose environment: [../../../dev-env/README.md](../../../dev-env/README.md)

## Documentation Links

- APIs workspace index: [../README.md](../README.md)
- Root monorepo guide: [../../../README.md](../../../README.md)
