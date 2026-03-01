# @nizar-repo/medical-histories-sdk

## Title & Description

Typed SDK for medical-histories API operations covering acts, medical histories, and appointments.

## Tech Stack

- TypeScript
- Axios transport via `@nizar-repo/server-sdk`
- Route typing from `@nizar-repo/medical-histories-types`

## Internal Dependencies

- `@nizar-repo/medical-histories-types`
- `@nizar-repo/server-sdk`

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
