# @nizar-repo/medical-histories-types

## Title & Description

Medical histories domain type contracts for acts, appointments, and medical histories route/model payloads. Shared by the medical-histories API, SDK package, and dashboard.

## Capabilities & Exports

- Exports typed contracts for acts catalog operations including create/read/update/delete payloads.
- Exports appointment and medical-history route/model contracts that represent clinical workflow state.
- Exports enums and domain model typings used by services and dashboard features (for example payment-state values).

## Tech Stack

- TypeScript type package
- Mongoose model typing

## Internal Dependencies

- `@nizar-repo/shared-types` -> [../../shared-types/README.md](../../shared-types/README.md) (declared dependency)

## Documentation Links

- Node packages index: [../../README.md](../../README.md)
- SDK consumer: [../../../SDK/medical-histories-sdk/README.md](../../../SDK/medical-histories-sdk/README.md)
- App/API consumers: [../../../../apps/APIs/medical-histories/README.md](../../../../apps/APIs/medical-histories/README.md), [../../../../apps/dashboard/README.md](../../../../apps/dashboard/README.md)

## Environment Variables

No environment variables are referenced.

## Available Scripts

| Script        | Command                            | What it does             |
| ------------- | ---------------------------------- | ------------------------ |
| `clean`       | `rimraf build`                     | clears build artifacts   |
| `build`       | `yarn clean && yarn build:cjs`     | package build entrypoint |
| `build:esm`   | `tsc -p tsconfig.esm.json`         | emits ESM output         |
| `build:cjs`   | `tsc -p tsconfig.cjs.json`         | emits CJS output         |
| `build:types` | `tsc --p tsconfig.types.prod.json` | emits declarations       |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Internal type contract package only.
