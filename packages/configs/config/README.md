# @nizar-repo/tailwindcss-config

## Title & Description

Shared design-system and Tailwind CSS configuration package. It centralizes design tokens (color, typography, spacing, component styles), global CSS utilities, and reusable Tailwind config for frontend apps/packages.

## Tech Stack

- Tailwind CSS configuration
- TypeScript design token definitions
- CSS variable-driven theming

## Internal Dependencies

No internal monorepo dependencies.

## Environment Variables

No runtime environment variables are required by this package.

## Available Scripts

No scripts are defined in this package `package.json`.

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Consumed by frontend apps (`@nizar-repo/tailwindcss-config/tailwind/styles/globals.css`) and extended in app-level Tailwind configs.
