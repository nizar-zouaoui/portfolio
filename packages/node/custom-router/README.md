# @nizar-repo/custom-router

## Title & Description

Express router wrapper that automatically decorates route handlers with async-safe try/catch middleware handling. This package standardizes error-handling behavior across backend APIs.

## Capabilities & Exports

- Exports `CustomRouter()` factory wrappers that automatically apply async-safe middleware around route handlers.
- Exports standardized error helpers/middleware patterns to reduce duplicated exception handling logic in API services.
- Enforces a consistent controller execution model across auth, patients, medical-histories, and test services.

## Tech Stack

- TypeScript
- Express Router
- CJS + ESM + declaration builds via TypeScript project configs

## Internal Dependencies

No internal monorepo package dependencies.

## Documentation Links

- Node packages index: [../README.md](../README.md)
- API consumers: [../../../apps/APIs/auth/README.md](../../../apps/APIs/auth/README.md), [../../../apps/APIs/patients/README.md](../../../apps/APIs/patients/README.md), [../../../apps/APIs/medical-histories/README.md](../../../apps/APIs/medical-histories/README.md), [../../../apps/APIs/test-api/README.md](../../../apps/APIs/test-api/README.md)

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
