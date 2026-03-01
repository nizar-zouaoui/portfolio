# dockerfiles

## Title & Description

Holds Docker build definitions used by the local environment. Current primary artifact is the proxy-balancer image that packages repository Nginx configuration.

## Tech Stack

- Docker
- Nginx base image

## Internal Dependencies

- `nginx/` (copied into `/etc/nginx/.` during image build)

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
