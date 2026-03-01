# @nizar-repo/patients-types

## Title & Description

Patient domain type contracts (route contracts and patient model definitions) shared across patients API, patients SDK, and dashboard UI.

## Tech Stack

- TypeScript type package
- Mongoose model typing

## Internal Dependencies

- `shared-types` (declared dependency string in package manifest)

## Environment Variables

No environment variables are referenced.

## Available Scripts

| Script        | Command                            | What it does             |
| ------------- | ---------------------------------- | ------------------------ |
| `clean`       | `rimraf build`                     | clears build artifacts   |
| `build`       | `yarn clean && yarn build:cjs`     | package build entrypoint |
| `build:esm`   | `tsc -p tsconfig.esm.json`         | emits ESM output         |
| `build:cjs`   | `tsc -p tsconfig.cjs.json`         | emits CJS output         |
| `build:types` | `tsc --p tsconfig.types.prod.json` | emits declarations       |

## Infrastructure & Deployment

- No Dockerfile/Nginx config.
- Used as shared type contract package only.
