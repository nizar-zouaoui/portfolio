# @nizar-repo/route-protection

## Title & Description

JWT authorization and role-based access control middleware package used by backend APIs. It validates bearer token structure, verifies JWT claims, enforces resource privilege checks, and provides secure token creation helpers.

## Capabilities & Exports

- Exports `protectRoute(accessPrivilege, resource)` middleware to enforce RBAC checks at route level.
- Exports secure token helper utilities used by auth flows (`createSecureToken`) and controlled fake-token generation for non-production scenarios.
- Exports JWT verification/claim validation behavior shared across backend APIs for consistent authorization outcomes.

## Tech Stack

- TypeScript
- Express middleware
- `jsonwebtoken`
- `http-errors`

## Internal Dependencies

- `@nizar-repo/auth-types` -> [../api-types/auth-types/README.md](../api-types/auth-types/README.md)

## Documentation Links

- Node packages index: [../README.md](../README.md)
- API consumers: [../../../apps/APIs/auth/README.md](../../../apps/APIs/auth/README.md), [../../../apps/APIs/patients/README.md](../../../apps/APIs/patients/README.md), [../../../apps/APIs/medical-histories/README.md](../../../apps/APIs/medical-histories/README.md)

## Environment Variables

| Variable         | Required | Purpose                                    | Format / Example             |
| ---------------- | -------- | ------------------------------------------ | ---------------------------- |
| `JWT_SECRET_KEY` | yes      | JWT signing/verifying secret               | secure string >= 32 chars    |
| `JWT_EXPIRES_IN` | optional | token expiration override                  | `24h`                        |
| `JWT_ISSUER`     | optional | issuer claim constraint                    | `medical-app`                |
| `JWT_AUDIENCE`   | optional | audience claim constraint                  | `medical-app-users`          |
| `NODE_ENV`       | optional | blocks fake token generation in production | `development` / `production` |

## Available Scripts

| Script        | Command                                                              | What it does            |
| ------------- | -------------------------------------------------------------------- | ----------------------- |
| `clean`       | `rimraf build`                                                       | clears build artifacts  |
| `build`       | `yarn clean && yarn build:esm && yarn build:cjs && yarn build:types` | full multi-format build |
| `build:esm`   | `tsc -p tsconfig.esm.json`                                           | emits ESM bundle        |
| `build:cjs`   | `tsc -p tsconfig.cjs.json`                                           | emits CommonJS bundle   |
| `build:types` | `tsc --p tsconfig.types.prod.json`                                   | emits type declarations |
| `lint`        | `tsc`                                                                | type-check lint pass    |
| `ci`          | `yarn lint && yarn build`                                            | CI validate + build     |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Integrated by API route modules through `protectRoute(accessPrivilege, resource)`.
