# @nizar-repo/auth-sdk

## Title & Description

Typed SDK wrapper around auth API endpoints. Provides login/sign-up/token refresh calls plus role/user endpoints on top of the shared `ApiSDK` transport.

## Tech Stack

- TypeScript
- Axios transport via `@nizar-repo/server-sdk`
- Auth route types from `@nizar-repo/auth-types`

## Internal Dependencies

- `@nizar-repo/auth-types`
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
- Endpoint base suffix: `/v1/auth`; server-side default target `http://auth:3000/api/v1/auth` unless overridden by `ApiSDK.baseURL.force`.
