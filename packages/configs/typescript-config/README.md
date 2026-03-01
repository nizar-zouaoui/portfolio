# @nizar-repo/typescript-config

## Title & Description

Shared TypeScript configuration presets for monorepo apps and packages, including base, Next.js, server, and react-library variants.

## Capabilities & Exports

- Exports standardized TS presets (`base`, `nextjs`, `server`, `react-library`) used by different runtime targets.
- Enforces consistent compiler strictness, module behavior, and declaration/source-map defaults across workspaces.
- Reduces per-project tsconfig duplication and keeps type-checking behavior predictable across app/package boundaries.

## Tech Stack

- TypeScript `tsconfig` preset package

## Internal Dependencies

No internal dependencies.

## Documentation Links

- Config packages index: [../README.md](../README.md)
- ESLint config companion: [../eslint-config/README.md](../eslint-config/README.md)
- Common consumers: [../../browser/ui/README.md](../../browser/ui/README.md), [../../browser/Toast/README.md](../../browser/Toast/README.md), [../../browser/Authenticator/README.md](../../browser/Authenticator/README.md)

## Environment Variables

No environment variables are used.

## Available Scripts

No scripts are defined in this package `package.json`.

## Provided Presets

- `base.json`: strict baseline options and shared defaults.
- `nextjs.json`: Next.js plugin + App Router oriented compilation settings.
- `server.json`: server-side CommonJS + declaration/source-map profile.
- `react-library.json`: browser-oriented library profile.

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Imported by workspace packages/apps through `extends` in their local `tsconfig*.json` files.
