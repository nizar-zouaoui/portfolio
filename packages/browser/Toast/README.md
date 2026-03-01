# @nizar-repo/toast

## Title & Description

Reusable toast notification system for React applications, including a toast context provider, toast rendering components, secure ID generation, and Vite-based package build output.

## Capabilities & Exports

- Exports `ToastProvider` and toast context hooks to trigger feedback messages from any mounted feature area.
- Exports toast rendering components for success/info/warning/error style notifications with consistent UX behavior.
- Exports utility logic for toast lifecycle handling (queueing, dismissal, identity generation) used by host apps.

## Tech Stack

- React + TypeScript
- Vite library mode + `vite-plugin-dts`
- Internal UI primitives from `@nizar-repo/ui`

## Internal Dependencies

- `@nizar-repo/ui` -> [../ui/README.md](../ui/README.md)
- `@nizar-repo/eslint-config` -> [../../configs/eslint-config/README.md](../../configs/eslint-config/README.md)
- `@nizar-repo/typescript-config` -> [../../configs/typescript-config/README.md](../../configs/typescript-config/README.md)

## Documentation Links

- Browser packages index: [../README.md](../README.md)
- Consuming apps: [../../../apps/client/README.md](../../../apps/client/README.md), [../../../apps/dashboard/README.md](../../../apps/dashboard/README.md)

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
