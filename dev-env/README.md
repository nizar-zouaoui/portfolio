# dev-env

## Title & Description

Local infrastructure orchestration directory for running the reverse proxy and MongoDB dependencies in Docker. This environment is used to front local app processes with a single HTTPS entrypoint.

## Tech Stack

- Docker Compose
- Nginx container image (customized via repository Dockerfile)
- MongoDB 7.0.5

## Internal Dependencies

- `dockerfiles/dockerfile.proxy-balancer`
- `nginx/` configuration and cert files
- root `.env`/`dev-env/.env` variables for DB credentials

## Environment Variables

| Variable            | Required | Purpose                                | Format / Example |
| ------------------- | -------- | -------------------------------------- | ---------------- |
| `DATABASE_USER`     | yes      | mapped to `MONGO_INITDB_ROOT_USERNAME` | `root`           |
| `DATABASE_PASSWORD` | yes      | mapped to `MONGO_INITDB_ROOT_PASSWORD` | `password`       |

## Available Scripts

No local `package.json` scripts exist in this directory.

## Infrastructure & Deployment

- `docker-compose.yml` services:
  - `web`: builds from `../dockerfiles/dockerfile.proxy-balancer`, exposes `3007:80` and `3000:443`.
  - `database`: MongoDB with root credentials, exposes `27017:27017`.
- Root make target: `make compose-dev` executes `cd dev-env && docker compose up --build --force-recreate -d --remove-orphans`.
