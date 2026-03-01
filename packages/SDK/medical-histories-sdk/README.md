# @nizar-repo/medical-histories-sdk

## Title & Description

Typed SDK for medical-histories API operations covering acts, medical histories, and appointments.

## Capabilities & Exports

- Exports typed client methods for acts catalog operations (list/detail/create/update/delete).
- Exports typed client methods for medical-history retrieval/creation/deletion and appointment lifecycle updates.
- Encapsulates medical-history domain endpoint patterns behind a stable API consumed by dashboards and services.

## Tech Stack

- TypeScript
- Axios transport via `@nizar-repo/server-sdk`
- Route typing from `@nizar-repo/medical-histories-types`

## Internal Dependencies

- `@nizar-repo/medical-histories-types` -> [../../node/api-types/medical-histories-types/README.md](../../node/api-types/medical-histories-types/README.md)
- `@nizar-repo/server-sdk` -> [../server-sdk/README.md](../server-sdk/README.md)

## Documentation Links

- SDK packages index: [../README.md](../README.md)
- API provider: [../../../apps/APIs/medical-histories/README.md](../../../apps/APIs/medical-histories/README.md)
- App consumers: [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md), [../../../apps/APIs/patients/README.md](../../../apps/APIs/patients/README.md)

## Environment Variables

| Variable   | Required | Purpose                                                 | Format / Example             |
| ---------- | -------- | ------------------------------------------------------- | ---------------------------- |
| `NODE_ENV` | optional | indirectly affects base URL force behavior via `ApiSDK` | `development` / `production` |

## Available Scripts

| Script        | Command                            | What it does              |
| ------------- | ---------------------------------- | ------------------------- |
| `clean`       | `rimraf build`                     | clears build output       |
| `build`       | `yarn clean && yarn build:cjs`     | builds package (CJS path) |
| `build:esm`   | `tsc -p tsconfig.esm.json`         | emits ESM output          |
| `build:cjs`   | `tsc -p tsconfig.cjs.json`         | emits CJS output          |
| `build:types` | `tsc --p tsconfig.types.prod.json` | emits declarations        |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Endpoint base suffix: `/v1/medical-histories`; server-side default target `http://medical-histories:3000/api/v1/medical-histories` unless overridden by `ApiSDK.baseURL.force`.
