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
