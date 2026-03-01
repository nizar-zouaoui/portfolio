# @nizar-repo/authenticator

## Title & Description

Reusable React authentication form package exporting `LoginForm` and `SignUpForm` components. It centralizes auth UI validation logic and styling used by frontend applications.

## Capabilities & Exports

- Exports `Login` and `SignUp` UI flows that encapsulate form state, validation, and submission orchestration for classic auth journeys.
- Exports reusable form composition patterns that keep authentication UX consistent across multiple frontend applications.
- Exports typed auth payload integration points aligned with internal auth contracts.

## Tech Stack

- React + TypeScript
- React Hook Form
- Internal UI components from `@nizar-repo/ui`

## Internal Dependencies

- `@nizar-repo/ui` -> [../ui/README.md](../ui/README.md)
- `@nizar-repo/auth-types` -> [../../node/api-types/auth-types/README.md](../../node/api-types/auth-types/README.md) (dev dependency for type contracts)

## Documentation Links

- Browser packages index: [../README.md](../README.md)
- Consuming apps: [../../../apps/client/README.md](../../../apps/client/README.md), [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md)
- Shared configs used by this package: [../../configs/eslint-config/README.md](../../configs/eslint-config/README.md), [../../configs/typescript-config/README.md](../../configs/typescript-config/README.md)

## Environment Variables

No runtime environment variables are referenced in this package.

## Available Scripts

| Script               | Command                     | What it does                                        |
| -------------------- | --------------------------- | --------------------------------------------------- |
| `lint`               | `eslint . --max-warnings 0` | lints package source                                |
| `generate:component` | `turbo gen react-component` | scaffolds a new React component via Turbo generator |

## Infrastructure & Deployment

- No Dockerfile/Nginx config in this package.
- Consumed as an internal workspace package by frontend apps.
