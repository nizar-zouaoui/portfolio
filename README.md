# portfolio (Turborepo Monorepo)

## Product Ecosystem

This repository builds a multi-application product ecosystem under the Simple Deliver umbrella: a public-facing experience for discovery and onboarding, an authenticated operations interface for execution, and backend services that enforce identity, permissions, and domain workflows.

At a product level, the apps combine as follows:

- Public experience ([apps/client/README.md](apps/client/README.md)): communicates product value, supports visitor education, and captures conversion through login/sign-up journeys.
- Operations workspace ([apps/dashboard/README.md](apps/dashboard/README.md)): gives authenticated teams practical tools to run daily work (patient records, acts catalog, appointments, payment-state follow-up).
- Identity backbone ([apps/APIs/auth/README.md](apps/APIs/auth/README.md)): centralizes account lifecycle, role assignment, and permission enforcement so users only access allowed capabilities.
- Operational data services ([apps/APIs/patients/README.md](apps/APIs/patients/README.md), [apps/APIs/medical-histories/README.md](apps/APIs/medical-histories/README.md)): store and expose core entities that power dashboard workflows from record creation through lifecycle updates.

Together, these applications create one end-to-end user experience: discover the platform -> authenticate -> perform domain actions in the dashboard -> persist and secure every action through typed, protected backend APIs.

## Project Overview

This repository is a Yarn workspaces + Turborepo monorepo that delivers:

- Two frontend applications:
  - [apps/client/README.md](apps/client/README.md): Next.js app (public pages + auth/session API bridge)
  - [apps/dashboard/README.md](apps/dashboard/README.md): Vite React app (authenticated operations UI)
- Four backend Express APIs:
  - [apps/APIs/auth/README.md](apps/APIs/auth/README.md)
  - [apps/APIs/patients/README.md](apps/APIs/patients/README.md)
  - [apps/APIs/medical-histories/README.md](apps/APIs/medical-histories/README.md)
  - [apps/APIs/test-api/README.md](apps/APIs/test-api/README.md)
- Shared internal packages:
  - browser UI/auth/toast components
  - typed SDK clients
  - API route/model type contracts
  - reusable middleware/utilities/config presets
- Infrastructure assets:
  - Nginx reverse-proxy + TLS config
  - Dockerfiles and compose-based local infra bootstrap

Primary business flow implemented by this codebase centers around authentication/authorization and medical-office operations (patients, medical histories, appointments, acts), with browser apps consuming SDKs that call the backend APIs through a single Nginx gateway.

## Documentation Map

### Apps

- Apps index: [apps/README.md](apps/README.md)
- APIs workspace: [apps/APIs/README.md](apps/APIs/README.md)
- Client app: [apps/client/README.md](apps/client/README.md)
- Dashboard app: [apps/dashboard/README.md](apps/dashboard/README.md)
- Auth API: [apps/APIs/auth/README.md](apps/APIs/auth/README.md)
- Patients API: [apps/APIs/patients/README.md](apps/APIs/patients/README.md)
- Medical-histories API: [apps/APIs/medical-histories/README.md](apps/APIs/medical-histories/README.md)
- Test API: [apps/APIs/test-api/README.md](apps/APIs/test-api/README.md)

### Packages

- Packages index: [packages/README.md](packages/README.md)
- Browser index: [packages/browser/README.md](packages/browser/README.md)
- Browser UI: [packages/browser/ui/README.md](packages/browser/ui/README.md)
- Browser Authenticator: [packages/browser/Authenticator/README.md](packages/browser/Authenticator/README.md)
- Browser Toast: [packages/browser/Toast/README.md](packages/browser/Toast/README.md)
- Node index: [packages/node/README.md](packages/node/README.md)
- Custom router: [packages/node/custom-router/README.md](packages/node/custom-router/README.md)
- Route protection: [packages/node/route-protection/README.md](packages/node/route-protection/README.md)
- Shared types: [packages/node/shared-types/README.md](packages/node/shared-types/README.md)
- Auth types: [packages/node/api-types/auth-types/README.md](packages/node/api-types/auth-types/README.md)
- Patients types: [packages/node/api-types/patients-types/README.md](packages/node/api-types/patients-types/README.md)
- Medical-histories types: [packages/node/api-types/medical-histories-types/README.md](packages/node/api-types/medical-histories-types/README.md)
- SDK index: [packages/SDK/README.md](packages/SDK/README.md)
- Server SDK: [packages/SDK/server-sdk/README.md](packages/SDK/server-sdk/README.md)
- Auth SDK: [packages/SDK/auth-sdk/README.md](packages/SDK/auth-sdk/README.md)
- Patients SDK: [packages/SDK/patients-sdk/README.md](packages/SDK/patients-sdk/README.md)
- Medical-histories SDK: [packages/SDK/medical-histories-sdk/README.md](packages/SDK/medical-histories-sdk/README.md)
- Config index: [packages/configs/README.md](packages/configs/README.md)
- Tailwind config: [packages/configs/config/README.md](packages/configs/config/README.md)
- ESLint config: [packages/configs/eslint-config/README.md](packages/configs/eslint-config/README.md)
- TypeScript config: [packages/configs/typescript-config/README.md](packages/configs/typescript-config/README.md)

### Infrastructure

- Dev environment: [dev-env/README.md](dev-env/README.md)
- Dockerfiles: [dockerfiles/README.md](dockerfiles/README.md)
- Nginx: [nginx/README.md](nginx/README.md)

## Architecture

### Runtime Communication Model

1. User enters through `https://localhost:3000` (Nginx TLS endpoint).
2. Nginx routes:
   - `/` -> Next.js app on `3001`
   - `/dashboard` -> Vite dashboard on `3002`
   - `/api/v1/auth` -> auth API on `4001`
   - `/api/v1/patients` -> patients API on `4005`
   - `/api/v1/medical-histories` -> medical-histories API on `4006`
3. Frontend SDK stack:
   - apps create `ApiSDK` from `@nizar-repo/server-sdk`
   - domain SDKs (`auth-sdk`, `patients-sdk`, `medical-histories-sdk`) wrap route calls
4. Auth/session model:
   - Next app exposes `/api/session` for create/read/update/delete session cookies
   - shared cookies (`AUTH_SESSION`, `API_TOKEN`, `AUTH_STATUS`) are used across both frontends under same domain
5. Backend authorization:
   - protected API routes call `protectRoute(...)` from `@nizar-repo/route-protection`
   - JWT secret/issuer/audience/expiry are read from env

### Data Layer

- Each API connects to MongoDB via Mongoose with separate DB URIs:
  - `portfolio-auth`
  - `portfolio-patients`
  - `portfolio-medical-histories`
  - `portfolio-test-api`

## Turborepo Pipeline

`turbo.json` defines:

- `globalDependencies`: `**/.env.*local`
- `globalEnv`: `NPM_TOKEN`, `DATABASE_USER`, `DATABASE_PASSWORD`, `JWT_SECRET_KEY`
- `tasks.build`:
  - depends on `^build`
  - outputs `.next/**` and excludes `.next/cache/**`
- `tasks.lint`:
  - depends on `^lint`
- `tasks.start`:
  - inputs `$TURBO_DEFAULT$`, `.env`
  - env passthrough includes auth/db/base-url values
  - `cache: false`, `persistent: true` (long-running dev processes)

Root scripts:

- `yarn build` -> `turbo build`
- `yarn start` -> `dotenv -- turbo run start --parallel`
- `yarn lint` -> `turbo lint`

## Repository Structure

```text
apps/
 APIs/
  auth/                 # auth + users + roles API service
  patients/             # patient CRUD/bulk API service
  medical-histories/    # acts/medical-histories/appointments API service
  test-api/             # lightweight test CRUD API
 client/                 # Next.js web app + /api/session endpoints
 dashboard/              # Vite React dashboard app at /dashboard

packages/
 browser/
  Authenticator/        # reusable login/sign-up form components
  Toast/                # reusable toast context + components
  ui/                   # shared design-system UI primitives
 node/
  custom-router/        # express router wrapper with try/catch middleware
  route-protection/     # JWT + RBAC middleware utilities
  shared-types/         # shared type utilities (pagination/validation)
  api-types/
   auth-types/         # auth route/model/enums contracts
   patients-types/     # patient route/model contracts
   medical-histories-types/ # medical domain contracts
 SDK/
  server-sdk/           # base axios transport and token refresh logic
  auth-sdk/             # auth API typed client
  patients-sdk/         # patients API typed client
  medical-histories-sdk/# medical-histories API typed client
 configs/
  config/               # shared Tailwind/design token assets
  eslint-config/        # shared ESLint presets
  typescript-config/    # shared tsconfig presets

dev-env/                  # docker-compose for nginx + mongo
dockerfiles/              # proxy container Dockerfile(s)
nginx/                    # reverse proxy, TLS, and h5bp includes
scripts/                  # monorepo package publish/build utility scripts
```

## Global Setup & Installation

### Prerequisites

- Node.js `>=18` (enforced in root `package.json`)
- Yarn `1.22.19` (root `packageManager`)
- Docker + Docker Compose (for infra services)

### 1) Clone and install

```bash
git clone <repo-url>
cd portfolio
yarn install
```

### 2) Configure environment

Create root `.env` from `.env.example` and set at least:

- `JWT_SECRET_KEY`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `USER_EMAIL`, `USER_PASSWORD`, `USER_USERNAME`
- `BASE_URL`, `NEXT_PUBLIC_BASE_URL`

Also ensure per-app env files exist where needed:

- `apps/APIs/*/.env` from each service `.env.example`
- `apps/client/.env` from `.env.example`
- `apps/dashboard/.env` from `.env.example`

### 3) Start local API/frontend processes

Run all workspace `start` scripts through Turbo:

```bash
yarn start
```

Or run specific apps/services manually from component directories when isolating issues.

## Running the Infrastructure

### Start proxy + database

```bash
make compose-dev
```

This executes:

```bash
cd dev-env && docker compose up --build --force-recreate -d --remove-orphans
```

Exposed ports:

- `https://localhost:3000` -> Nginx TLS entrypoint (`443` in container)
- `http://localhost:3007` -> Nginx HTTP listener (`80` in container)
- `localhost:27017` -> MongoDB

### Important routing note

The Nginx container proxies to `host.docker.internal` ports, so frontend/API Node processes must also be running on the host (`3001`, `3002`, `4001`, `4005`, `4006`) for full end-to-end behavior.

## Component Documentation Index

Detailed READMEs are available in each component root, including env vars, scripts, internal deps, and deployment notes.

- Apps: [apps/client/README.md](apps/client/README.md), [apps/dashboard/README.md](apps/dashboard/README.md), [apps/APIs/README.md](apps/APIs/README.md)
- Packages: [packages/browser/README.md](packages/browser/README.md), [packages/node/README.md](packages/node/README.md), [packages/SDK/README.md](packages/SDK/README.md), [packages/configs/README.md](packages/configs/README.md)
- Infra/config: [dev-env/README.md](dev-env/README.md), [dockerfiles/README.md](dockerfiles/README.md), [nginx/README.md](nginx/README.md)
