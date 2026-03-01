# @nizar-repo/shared-types

## Title & Description

Shared backend/frontend type contracts for cross-domain utility models such as pagination and validation helpers.

## Tech Stack

- TypeScript declaration package
- Multi-target build (ESM/CJS/types)

## Internal Dependencies

No internal monorepo dependencies.

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
