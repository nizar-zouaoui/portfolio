# @nizar-repo/typescript-config

## Title & Description

Shared TypeScript configuration presets for monorepo apps and packages, including base, Next.js, server, and react-library variants.

## Tech Stack

- TypeScript `tsconfig` preset package

## Internal Dependencies

No internal dependencies.

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
