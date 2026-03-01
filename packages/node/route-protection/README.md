# @nizar-repo/route-protection

## Title & Description

JWT authorization and role-based access control middleware package used by backend APIs. It validates bearer token structure, verifies JWT claims, enforces resource privilege checks, and provides secure token creation helpers.

## Tech Stack

- TypeScript
- Express middleware
- `jsonwebtoken`
- `http-errors`

## Internal Dependencies

- `@nizar-repo/auth-types`

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
