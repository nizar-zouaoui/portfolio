# @nizar-repo/ui

## Title & Description

Primary shared UI component library for the monorepo. Exposes form controls, data table components, button/loader primitives, icon sets, and dark-mode provider/hooks consumed by both frontend applications and browser packages.

## Tech Stack

- React + TypeScript
- Tailwind CSS token consumption
- Internal component generator integration (`@turbo/gen`)

## Internal Dependencies

- `@nizar-repo/eslint-config`
- `@nizar-repo/typescript-config`

## Environment Variables

No direct runtime environment variables are referenced in package source.

## Available Scripts

| Script               | Command                     | What it does                  |
| -------------------- | --------------------------- | ----------------------------- |
| `lint`               | `eslint . --max-warnings 0` | lints package sources         |
| `generate:component` | `turbo gen react-component` | scaffolds new component files |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Published/consumed as internal workspace package and transpiled by host apps (`transpilePackages` in Next app).
