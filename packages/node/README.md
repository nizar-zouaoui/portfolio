# packages/node

## Description

Backend-focused shared packages:

- `custom-router`: async-safe express router wrapper
- `route-protection`: JWT and role-protection middleware
- `shared-types`: shared cross-service types
- `api-types/*`: route/model contracts per domain

## Capabilities & Exports

- Middleware exports: standardized Express router/error handling and route-level authorization enforcement helpers.
- Contract exports: shared domain route/model typings for auth, patients, and medical-history workflows.
- Utility type exports: cross-service pagination and validation types used by APIs, SDKs, and dashboards.

## Documentation Links

- Packages index: [../README.md](../README.md)
- Custom router: [custom-router/README.md](custom-router/README.md)
- Route protection: [route-protection/README.md](route-protection/README.md)
- Shared types: [shared-types/README.md](shared-types/README.md)
- Auth types: [api-types/auth-types/README.md](api-types/auth-types/README.md)
- Patients types: [api-types/patients-types/README.md](api-types/patients-types/README.md)
- Medical-histories types: [api-types/medical-histories-types/README.md](api-types/medical-histories-types/README.md)

## Usage

Imported by `apps/APIs/*` and `packages/SDK/*`.
