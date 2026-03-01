# @nizar-repo/auth-types

## Title & Description

Auth domain type contracts for routes, models, enums, and access-resource metadata used by auth API, route-protection middleware, and auth SDK consumers.

## Capabilities & Exports

- Exports auth route request/response contract types used by API controllers and SDK wrappers.
- Exports role and access-resource enums/constants used to model authorization rules.
- Exports auth/user/role model typings shared by service, middleware, and UI-auth integration layers.

## Tech Stack

- TypeScript type package
- Mongoose-aware model typing

## Internal Dependencies

No direct internal dependencies.

## Documentation Links

- Node packages index: [../../README.md](../../README.md)
- Route-protection consumer: [../../route-protection/README.md](../../route-protection/README.md)
- SDK consumer: [../../../SDK/auth-sdk/README.md](../../../SDK/auth-sdk/README.md)
- App/package consumers: [../../../../apps/APIs/auth/README.md](../../../../apps/APIs/auth/README.md), [../../../browser/Authenticator/README.md](../../../browser/Authenticator/README.md)

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
