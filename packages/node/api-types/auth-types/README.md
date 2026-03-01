# @nizar-repo/auth-types

## Title & Description

Auth domain type contracts for routes, models, enums, and access-resource metadata used by auth API, route-protection middleware, and auth SDK consumers.

## Tech Stack

- TypeScript type package
- Mongoose-aware model typing

## Internal Dependencies

No direct internal dependencies.

## Environment Variables

No environment variables are referenced in this package.

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
- Internal type-only package consumed by API, middleware, and SDK layers.
