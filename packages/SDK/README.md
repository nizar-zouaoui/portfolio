# packages/SDK

## Description

Typed API client packages built over `@nizar-repo/server-sdk`:

- `auth-sdk`
- `patients-sdk`
- `medical-histories-sdk`
- `server-sdk` (transport core)

## Capabilities & Exports

- Transport core exports: reusable `ApiSDK` transport/client setup with token lifecycle and retry behavior.
- Domain client exports: typed service clients that encapsulate auth, patients, and medical-history endpoint calls.
- Contract-safe interaction: SDK methods are aligned with internal API-type packages to reduce request/response drift.

## Documentation Links

- Packages index: [../README.md](../README.md)
- Server SDK: [server-sdk/README.md](server-sdk/README.md)
- Auth SDK: [auth-sdk/README.md](auth-sdk/README.md)
- Patients SDK: [patients-sdk/README.md](patients-sdk/README.md)
- Medical-histories SDK: [medical-histories-sdk/README.md](medical-histories-sdk/README.md)
- Consuming apps: [../../apps/client/README.md](../../apps/client/README.md), [../../apps/dashboard/README.md](../../apps/dashboard/README.md)

## Usage

Consumed primarily by frontend apps (`apps/client`, `apps/dashboard`).
