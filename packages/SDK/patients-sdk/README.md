# @nizar-repo/patients-sdk

## Title & Description

Typed SDK for patients API operations (list/get/create/update/delete and bulk create), built on shared `ApiSDK` transport.

## Capabilities & Exports

- Exports typed CRUD client methods for patient listing, detail retrieval, creation, update, deletion, and bulk insert.
- Exports query/body parameter contracts aligned with patients domain types.
- Encapsulates patients endpoint URLs and transport calls behind a reusable client abstraction.

## Tech Stack

- TypeScript
- Axios transport via `@nizar-repo/server-sdk`
- Route typing from `@nizar-repo/patients-types`

## Internal Dependencies

- `@nizar-repo/patients-types` -> [../../node/api-types/patients-types/README.md](../../node/api-types/patients-types/README.md)
- `@nizar-repo/server-sdk` -> [../server-sdk/README.md](../server-sdk/README.md)

## Documentation Links

- SDK packages index: [../README.md](../README.md)
- API provider: [../../../apps/APIs/patients/README.md](../../../apps/APIs/patients/README.md)
- App consumers: [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md)

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
- Endpoint base suffix: `/v1/patients`; server-side default target `http://patients:3000/api/v1/patients` unless overridden by `ApiSDK.baseURL.force`.
