# @nizar-repo/dashboard

## Title & Description

`@nizar-repo/dashboard` is the authenticated React + Vite operations UI. It manages patient records, medical histories, acts, and appointments by consuming internal SDK packages and sharing auth session state with the Next.js client through same-domain cookies.

## Features & Capabilities

### Core Purpose

This app is the day-to-day operational cockpit for authenticated staff. It centralizes core business work: maintaining patient records, managing treatment catalog entries, and tracking appointment/payment progression over time.

### Key Features

- Auth-gated workspace: route composition switches between public/auth pages and private operational pages based on active authentication state.
- Patient registry management: users can browse paginated patient lists, add new patients, edit existing records, and remove outdated entries.
- Acts catalog administration: users can maintain the catalog of available medical acts/procedures including pricing and descriptions.
- Medical history timeline access: users can navigate from a patient to their medical history context and inspect appointment records tied to that history.
- Appointment lifecycle control: users can create, edit, and delete appointments with procedure references, notes, scheduling dates, and payment status.
- Operational visibility: list views expose quick performance indicators (counts, paid/pending distribution, procedure totals) to support daily decision-making.

### User Flows / Primary Endpoints

- Main views/pages:
  - `/dashboard/` (home)
  - `/dashboard/about-us` (public product/about page)
  - `/dashboard/login` (authentication entry)
  - `/dashboard/patients` (patients list)
  - `/dashboard/patients/add` and `/dashboard/patients/edit/:id`
  - `/dashboard/acts` plus `/dashboard/acts/add` and `/dashboard/acts/edit/:id`
  - `/dashboard/patients/:id/medical-histories` (appointments list)
  - `/dashboard/patients/:id/medical-histories/:medicalHistoryId/appointments/add`
  - `/dashboard/patients/:id/medical-histories/:medicalHistoryId/appointments/edit/:appointmentId`
- Primary user flow: authenticate -> open patient/acts modules -> drill into patient history -> create/update appointments and payment state.

## Tech Stack

- React 18 + TypeScript
- Vite 5
- React Router 6
- React Query
- React Hook Form
- Shared UI/Toast/Auth SDK packages

## Internal Dependencies

- `@nizar-repo/auth-sdk`
- `@nizar-repo/patients-sdk`
- `@nizar-repo/medical-histories-sdk`
- `@nizar-repo/server-sdk`
- `@nizar-repo/toast`
- `@nizar-repo/ui`
- `@nizar-repo/tailwindcss-config` (dev dependency)

## Environment Variables

Detected from `apps/dashboard/.env.example`, auth session management, and Vite config.

| Variable              | Required       | Purpose                                                     | Format / Example             |
| --------------------- | -------------- | ----------------------------------------------------------- | ---------------------------- |
| `VITE_SESSION_SECRET` | yes (declared) | reserved session secret placeholder                         | secure string                |
| `VITE_JWT_SECRET_KEY` | yes (declared) | declared JWT secret for dashboard env surface               | secure string                |
| `VITE_JWT_EXPIRES_IN` | optional       | controls fallback cookie expiry in dashboard session helper | numeric string, e.g. `1`     |
| `NODE_ENV`            | implicit       | controls HTTPS certificate loading and production flags     | `development` / `production` |
| `ANALYZE`             | optional       | enables bundle analysis plugin output                       | `true` / `false`             |

## Available Scripts

| Script    | Command                | What it does                                      |
| --------- | ---------------------- | ------------------------------------------------- |
| `start`   | `vite --host`          | starts Vite dev server (configured port `3002`)   |
| `build`   | `tsc -b && vite build` | type-checks/builds dashboard bundle into `build/` |
| `lint`    | `eslint .`             | lints project sources                             |
| `preview` | `vite preview`         | serves built output locally                       |

## Infrastructure & Deployment

- Local runtime port: `3002` (`vite.config.ts`).
- Vite base path and router basename are `/dashboard`.
- Nginx routing:
  - `/dashboard` -> `https://host.docker.internal:3002`
- Dev HTTPS cert/key are read from `../../nginx/cert/localhost3000.crt` and `../../nginx/cert/localhost3000.key` in non-production.
- Auth/session integration:
  - dashboard calls `/api/session` endpoints (served by Next.js app) to create/update/delete shared cookies.
  - `API_TOKEN` cookie is propagated to SDK bearer token via `updateApiToken()`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
