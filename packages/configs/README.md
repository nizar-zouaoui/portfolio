# packages/configs

## Description

Shared tooling/configuration packages used across monorepo workspaces:

- `config`: Tailwind + design-system tokens
- `eslint-config`: reusable lint profiles
- `typescript-config`: reusable tsconfig presets

## Capabilities & Exports

- Styling standardization exports: centralized Tailwind presets and design-token primitives for consistent visual language.
- Code-quality standardization exports: reusable ESLint configurations for libraries, React apps, and Next.js apps.
- Type-system standardization exports: shared TypeScript presets for server, React library, and Next.js build contexts.

## Documentation Links

- Packages index: [../README.md](../README.md)
- Tailwind/design config: [config/README.md](config/README.md)
- ESLint config: [eslint-config/README.md](eslint-config/README.md)
- TypeScript config: [typescript-config/README.md](typescript-config/README.md)
- Consuming app examples: [../../apps/client/README.md](../../apps/client/README.md), [../../apps/dashboard/README.md](../../apps/dashboard/README.md)

## Usage

Referenced as internal workspace dev dependencies by apps and packages.
