# @nizar-repo/tailwindcss-config

## Title & Description

Shared design-system and Tailwind CSS configuration package. It centralizes design tokens (color, typography, spacing, component styles), global CSS utilities, and reusable Tailwind config for frontend apps/packages.

## Capabilities & Exports

- Exports shared Tailwind configuration consumed by frontend apps to enforce consistent spacing, palette, typography, and utility behavior.
- Exports global CSS styles and design-token variables used by UI and browser packages.
- Exports reusable theme primitives to keep branding and component presentation aligned across app surfaces.

## Tech Stack

- Tailwind CSS configuration
- TypeScript design token definitions
- CSS variable-driven theming

## Internal Dependencies

No internal monorepo dependencies.

## Documentation Links

- Config packages index: [../README.md](../README.md)
- UI package consumer: [../../browser/ui/README.md](../../browser/ui/README.md)
- App consumers: [../../../apps/client/README.md](../../../apps/client/README.md), [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md)

## Environment Variables

No runtime environment variables are required by this package.

## Available Scripts

No scripts are defined in this package `package.json`.

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Consumed by frontend apps (`@nizar-repo/tailwindcss-config/tailwind/styles/globals.css`) and extended in app-level Tailwind configs.
