# @nizar-repo/toast

## Title & Description

Reusable toast notification system for React applications, including a toast context provider, toast rendering components, secure ID generation, and Vite-based package build output.

## Tech Stack

- React + TypeScript
- Vite library mode + `vite-plugin-dts`
- Internal UI primitives from `@nizar-repo/ui`

## Internal Dependencies

- `@nizar-repo/ui`
- `@nizar-repo/eslint-config`
- `@nizar-repo/typescript-config`

## Environment Variables

| Variable                               | Required | Purpose                                                                 | Format / Example |
| -------------------------------------- | -------- | ----------------------------------------------------------------------- | ---------------- |
| `process.env` (Vite loaded env object) | optional | injected at build-time via Vite `define` for consistency with host apps | key/value map    |

No specific variable key is required by package source.

## Available Scripts

| Script               | Command                      | What it does                                                        |
| -------------------- | ---------------------------- | ------------------------------------------------------------------- |
| `lint`               | `eslint . --max-warnings 0`  | lints package source                                                |
| `generate:component` | `turbo gen react-component`  | scaffolds a new React component                                     |
| `build`              | `rimraf build && vite build` | builds CJS/ES outputs and generated declaration files into `build/` |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Library output configured in `vite.config.ts` with `preserveModules` and `build/@types` declaration output.
- Intended for internal workspace consumption.
