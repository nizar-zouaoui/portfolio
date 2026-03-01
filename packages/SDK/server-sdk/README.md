# @nizar-repo/server-sdk

## Title & Description

Core HTTP transport SDK used by all domain SDKs. It encapsulates Axios initialization, bearer token handling, refresh-token interceptor behavior, and environment-aware HTTPS/base URL defaults.

## Capabilities & Exports

- Exports base `ApiSDK` transport abstractions used by all domain SDK packages.
- Exports request/response interceptor behavior for token refresh and automatic retry on expired-auth scenarios.
- Exports bearer-token management helpers and environment-aware base URL defaults for browser/server contexts.

## Tech Stack

- TypeScript
- Axios
- Node HTTPS agent for server-side TLS behavior

## Internal Dependencies

No internal monorepo runtime dependencies.

## Documentation Links

- SDK packages index: [../README.md](../README.md)
- Domain SDK consumers: [../auth-sdk/README.md](../auth-sdk/README.md), [../patients-sdk/README.md](../patients-sdk/README.md), [../medical-histories-sdk/README.md](../medical-histories-sdk/README.md)
- App-level consumers: [../../../apps/client/README.md](../../../apps/client/README.md), [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md)

## Environment Variables

| Variable   | Required | Purpose                                                                 | Format / Example             |
| ---------- | -------- | ----------------------------------------------------------------------- | ---------------------------- |
| `NODE_ENV` | optional | controls `baseURL.force` behavior and HTTPS `rejectUnauthorized` policy | `development` / `production` |

## Available Scripts

| Script        | Command                                                              | What it does              |
| ------------- | -------------------------------------------------------------------- | ------------------------- |
| `clean`       | `rimraf build`                                                       | clears build output       |
| `lint`        | `tsc --noEmit && eslint . --fix`                                     | type-check + lint autofix |
| `test`        | `jest --coverage --passWithNoTests`                                  | runs tests with coverage  |
| `build`       | `yarn clean && yarn build:esm && yarn build:cjs && yarn build:types` | full build                |
| `build:esm`   | `tsc -p tsconfig.prod.json --module ES2022 --outDir build/esm`       | ESM build                 |
| `build:cjs`   | `tsc -p tsconfig.prod.json --module commonjs --outDir build/cjs`     | CJS build                 |
| `build:types` | `tsc --p tsconfig.types.prod.json -emitDeclarationOnly`              | declaration output        |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Default browser base URL: `/api`; default server base URL: `https://localhost:3000/api`.
- Built-in response interceptor retries failed requests after refresh-token flow when receiving forbidden token-expired responses.
