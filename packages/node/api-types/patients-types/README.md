# @nizar-repo/patients-types

## Title & Description

Patient domain type contracts (route contracts and patient model definitions) shared across patients API, patients SDK, and dashboard UI.

## Capabilities & Exports

- Exports patients route contracts for list/detail/create/update/delete operations.
- Exports patient model and static method typings (including paginated query signatures) aligned with service implementation.
- Exports shared patient payload contracts consumed by SDK and dashboard form/list workflows.

## Tech Stack

- TypeScript type package
- Mongoose model typing

## Internal Dependencies

- `@nizar-repo/shared-types` -> [../../shared-types/README.md](../../shared-types/README.md) (declared dependency)

## Documentation Links

- Node packages index: [../../README.md](../../README.md)
- SDK consumer: [../../../SDK/patients-sdk/README.md](../../../SDK/patients-sdk/README.md)
- App/API consumers: [../../../../apps/APIs/patients/README.md](../../../../apps/APIs/patients/README.md), [../../../../apps/dashboard/README.md](../../../../apps/dashboard/README.md)

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
- Used as shared type contract package only.
