# dockerfiles

## Title & Description

Holds Docker build definitions used by the local environment. Current primary artifact is the proxy-balancer image that packages repository Nginx configuration.

## Tech Stack

- Docker
- Nginx base image

## Internal Dependencies

- `nginx/` (copied into `/etc/nginx/.` during image build)

Linked docs:

- Nginx configuration: [../nginx/README.md](../nginx/README.md)
- Dev compose environment: [../dev-env/README.md](../dev-env/README.md)
- Root setup guide: [../README.md](../README.md)

## Environment Variables

No environment variables are consumed directly by the Dockerfile.

## Available Scripts

No local scripts defined in this directory.

## Infrastructure & Deployment

- `dockerfile.proxy-balancer`:
  - `FROM nginx`
  - `COPY ../nginx /etc/nginx/.`
  - installs `procps` package
- Used by `dev-env/docker-compose.yml` service `web`.

## Documentation Links

- Apps index: [../apps/README.md](../apps/README.md)
- Packages index: [../packages/README.md](../packages/README.md)
