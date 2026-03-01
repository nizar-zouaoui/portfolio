# @nizar-repo/test-api

## Title & Description

`test-api` is a lightweight test service exposing a simple CRUD route set used for API validation and development checks.

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- `@nizar-repo/custom-router`
- `express-validator`, `cors`, `http-errors`

## Internal Dependencies

- `@nizar-repo/custom-router`
- `@nizar-repo/route-protection` (declared dependency)
- `@nizar-repo/auth-types`
- `@nizar-repo/shared-types`

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
