# @nizar-repo/eslint-config

## Title & Description

Central ESLint rules package for monorepo applications and libraries. It provides reusable config entrypoints for generic libraries, Next.js apps, and internal React bundles.

## Capabilities & Exports

- Exports `library`, `next`, and `react-internal` ESLint profiles that standardize linting behavior across workspace types.
- Exports rule baselines for import ordering, unused-import cleanup, and TypeScript lint consistency.
- Enforces monorepo-wide code quality defaults so apps and packages avoid drift in style and static-analysis behavior.

## Tech Stack

- ESLint 9
- `eslint-config-turbo`
- `@vercel/style-guide` (for Next profile)
- TypeScript ESLint parser/plugins
- Import sorting + unused import cleanup plugins

## Internal Dependencies

No internal runtime dependencies.

## Documentation Links

- Config packages index: [../README.md](../README.md)
- TypeScript config companion: [../typescript-config/README.md](../typescript-config/README.md)
- Common consumers: [../../browser/ui/README.md](../../browser/ui/README.md), [../../browser/Toast/README.md](../../browser/Toast/README.md), [../../browser/Authenticator/README.md](../../browser/Authenticator/README.md)

## Environment Variables

No environment variables are required.

## Available Scripts

No scripts are defined in this package `package.json`.

## Exported Config Files

- `library.js`: generic library profile (import sort + unused import rules).
- `next.js`: Next.js profile extending Vercel style guide.
- `react-internal.js`: React internal-library profile.

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Consumed by workspace packages/apps through dev dependency `@nizar-repo/eslint-config`.
