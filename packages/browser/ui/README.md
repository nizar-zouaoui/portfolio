# @nizar-repo/ui

## Title & Description

Primary shared UI component library for the monorepo. Exposes form controls, data table components, button/loader primitives, icon sets, and dark-mode provider/hooks consumed by both frontend applications and browser packages.

## Capabilities & Exports

- Exports foundational UI primitives used across the product (buttons, loaders, table controls, form controls, and icons).
- Exports theme/runtime UX helpers such as dark-mode provider/hooks that standardize visual behavior across host apps.
- Exports composition-ready shared components that reduce duplicated presentation logic in app and package layers.

## Tech Stack

- React + TypeScript
- Tailwind CSS token consumption
- Internal component generator integration (`@turbo/gen`)

## Internal Dependencies

- `@nizar-repo/eslint-config` -> [../../configs/eslint-config/README.md](../../configs/eslint-config/README.md)
- `@nizar-repo/typescript-config` -> [../../configs/typescript-config/README.md](../../configs/typescript-config/README.md)

## Documentation Links

- Browser packages index: [../README.md](../README.md)
- Consuming apps/packages: [../../../apps/client/README.md](../../../apps/client/README.md), [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md), [../Authenticator/README.md](../Authenticator/README.md), [../Toast/README.md](../Toast/README.md)
- Shared design token package: [../../configs/config/README.md](../../configs/config/README.md)

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
