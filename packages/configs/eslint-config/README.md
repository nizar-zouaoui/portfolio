# @nizar-repo/eslint-config

## Title & Description

Central ESLint rules package for monorepo applications and libraries. It provides reusable config entrypoints for generic libraries, Next.js apps, and internal React bundles.

## Tech Stack

- ESLint 9
- `eslint-config-turbo`
- `@vercel/style-guide` (for Next profile)
- TypeScript ESLint parser/plugins
- Import sorting + unused import cleanup plugins

## Internal Dependencies

No internal runtime dependencies.

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
