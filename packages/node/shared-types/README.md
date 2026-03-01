# @nizar-repo/shared-types

## Title & Description

Shared backend/frontend type contracts for cross-domain utility models such as pagination and validation helpers.

## Capabilities & Exports

- Exports generic pagination query/response contracts used for list views and paginated API endpoints.
- Exports shared utility types that normalize validation and transport typing across backend and frontend layers.
- Provides cross-domain foundational types consumed by domain type packages and services.

## Tech Stack

- TypeScript declaration package
- Multi-target build (ESM/CJS/types)

## Internal Dependencies

No internal monorepo dependencies.

## Documentation Links

- Node packages index: [../README.md](../README.md)
- Domain types using this package: [../api-types/patients-types/README.md](../api-types/patients-types/README.md), [../api-types/medical-histories-types/README.md](../api-types/medical-histories-types/README.md)
- API/SDK consumers: [../../../apps/APIs/patients/README.md](../../../apps/APIs/patients/README.md), [../../../apps/APIs/medical-histories/README.md](../../../apps/APIs/medical-histories/README.md), [../../SDK/patients-sdk/README.md](../../SDK/patients-sdk/README.md), [../../SDK/medical-histories-sdk/README.md](../../SDK/medical-histories-sdk/README.md)

## Environment Variables

No environment variables are referenced.

## Available Scripts

| Script        | Command                                                              | What it does            |
| ------------- | -------------------------------------------------------------------- | ----------------------- |
| `clean`       | `rimraf build`                                                       | clears build artifacts  |
| `build`       | `yarn clean && yarn build:esm && yarn build:cjs && yarn build:types` | full build pipeline     |
| `build:esm`   | `tsc -p tsconfig.esm.json`                                           | emits ESM               |
| `build:cjs`   | `tsc -p tsconfig.cjs.json`                                           | emits CJS               |
| `build:types` | `tsc --p tsconfig.types.prod.json`                                   | emits declaration files |
| `lint`        | `tsc`                                                                | type-check lint pass    |
| `ci`          | `yarn lint && yarn build`                                            | CI validate + build     |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Imported by APIs, SDKs, and dashboard app for consistent query/result typing.
