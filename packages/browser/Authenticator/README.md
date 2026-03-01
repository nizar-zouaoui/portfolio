# @nizar-repo/authenticator

## Title & Description

Reusable React authentication form package exporting `LoginForm` and `SignUpForm` components. It centralizes auth UI validation logic and styling used by frontend applications.

## Tech Stack

- React + TypeScript
- React Hook Form
- Internal UI components from `@nizar-repo/ui`

## Internal Dependencies

- `@nizar-repo/ui`
- `@nizar-repo/auth-types` (dev dependency for type contracts)

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
