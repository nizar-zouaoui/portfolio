# @nizar-repo/custom-router

## Title & Description

Express router wrapper that automatically decorates route handlers with async-safe try/catch middleware handling. This package standardizes error-handling behavior across backend APIs.

## Tech Stack

- TypeScript
- Express Router
- CJS + ESM + declaration builds via TypeScript project configs

## Internal Dependencies

No internal monorepo package dependencies.

## Environment Variables

| Variable   | Required | Purpose                                                     | Format / Example             |
| ---------- | -------- | ----------------------------------------------------------- | ---------------------------- |
| `NODE_ENV` | optional | used by secure error handling helpers for dev/prod behavior | `development` / `production` |

## Available Scripts

| Script        | Command                                                              | What it does              |
| ------------- | -------------------------------------------------------------------- | ------------------------- |
| `clean`       | `rimraf build`                                                       | clears build artifacts    |
| `build`       | `yarn clean && yarn build:esm && yarn build:cjs && yarn build:types` | full multi-format build   |
| `build:esm`   | `tsc -p tsconfig.esm.json`                                           | emits ESM bundle          |
| `build:cjs`   | `tsc -p tsconfig.cjs.json`                                           | emits CommonJS bundle     |
| `build:types` | `tsc --p tsconfig.types.prod.json`                                   | emits type declarations   |
| `lint`        | `tsc`                                                                | type-check lint pass      |
| `ci`          | `yarn lint && yarn build`                                            | CI-ready validate + build |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Consumed by API services to create wrapped routers (`CustomRouter()()`).
