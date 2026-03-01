# nginx

## Title & Description

Reverse proxy and TLS termination configuration for the monorepo. It consolidates frontend and API services behind `https://localhost:3000`, applies H5BP performance/security includes, and forwards traffic to local app processes.

## Tech Stack

- Nginx
- H5BP modular include configs
- Self-signed local TLS certificate chain

## Internal Dependencies

- Proxies traffic to runtime services started outside container:
  - Next app on `3001`
  - Dashboard app on `3002`
  - Auth API on `4001`
  - Patients API on `4005`
  - Medical-histories API on `4006`

Linked docs:

- Client app: [../apps/client/README.md](../apps/client/README.md)
- Dashboard app: [../apps/dashboard/README.md](../apps/dashboard/README.md)
- APIs workspace: [../apps/APIs/README.md](../apps/APIs/README.md)
- Dockerfiles: [../dockerfiles/README.md](../dockerfiles/README.md)
- Dev compose environment: [../dev-env/README.md](../dev-env/README.md)

## Environment Variables

No environment variables are directly referenced in Nginx configuration files.

## Available Scripts

No local scripts defined in this directory.

## Infrastructure & Deployment

- `nginx.conf` defines global worker/http settings and includes `conf.d/*.conf`.
- `conf.d/default.conf` active routing:
  - `listen 80` -> redirect to `https://$host:3000$request_uri`
  - `listen 443 ssl`
  - `/api/v1/auth` -> `http://host.docker.internal:4001`
  - `/api/v1/patients` -> `http://host.docker.internal:4005`
  - `/api/v1/medical-histories` -> `http://host.docker.internal:4006`
  - `/dashboard` -> `https://host.docker.internal:3002`
  - `/_next/webpack-hmr` -> `http://host.docker.internal:3001/_next/webpack-hmr`
  - `/` -> `http://host.docker.internal:3001`
- TLS assets live under `cert/` (`localhost3000.crt`, `localhost3000.key`).

## Documentation Links

- Root monorepo guide: [../README.md](../README.md)
- Packages index: [../packages/README.md](../packages/README.md)
