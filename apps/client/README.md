# @nizar-repo/client

## Title & Description

`@nizar-repo/client` is the Next.js public/auth web application. It provides the marketing/public pages and authentication screens, hosts session APIs (`/api/session`), and acts as the primary browser entrypoint proxied at `/` by Nginx.

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- React Query
- Tailwind CSS (shared config package)
- Internal UI/Auth/SDK packages

## Internal Dependencies

- `@nizar-repo/auth-sdk`
- `@nizar-repo/authenticator`
- `@nizar-repo/server-sdk`
- `@nizar-repo/toast`
- `@nizar-repo/ui`
- `@nizar-repo/tailwindcss-config` (dev dependency)

## Environment Variables

Detected from `apps/client/.env.example`, session helpers, and middleware helpers.

| Variable                     | Required       | Purpose                                                | Format / Example                        |
| ---------------------------- | -------------- | ------------------------------------------------------ | --------------------------------------- |
| `NEXT_PUBLIC_SESSION_SECRET` | yes (declared) | reserved session secret value for client config        | secure string (>= 32 chars recommended) |
| `NEXT_PUBLIC_JWT_SECRET_KEY` | yes            | used by server-side `isAuthenticated` JWT verification | secure string (>= 32 chars)             |
| `NEXT_PUBLIC_JWT_EXPIRES_IN` | optional       | controls cookie/session expiry days in session helper  | numeric string, e.g. `1`                |
| `NODE_ENV`                   | implicit       | toggles production/dev behavior in SDK and Next config | `development` / `production`            |
| `ANALYZE`                    | optional       | enables webpack bundle analyzer in optimized config    | `true` / `false`                        |

## Available Scripts

| Script       | Command                     | What it does                           |
| ------------ | --------------------------- | -------------------------------------- |
| `start`      | `next dev --port 3001`      | starts local dev server on port `3001` |
| `build`      | `next build`                | creates production build               |
| `start:prod` | `next start`                | runs built app in production mode      |
| `lint`       | `eslint . --max-warnings 0` | lints source with zero-warning policy  |

## Infrastructure & Deployment

- Local runtime port: `3001`.
- Nginx routing:
  - `/` -> `http://host.docker.internal:3001`
  - `/_next/webpack-hmr` -> `http://host.docker.internal:3001/_next/webpack-hmr`
- Session API endpoints (`src/app/api/session/route.ts`):
  - `POST /api/session` create secure cookies
  - `GET /api/session` read current token
  - `PUT /api/session` refresh/rotate session
  - `DELETE /api/session` clear session cookies
- Cookie strategy: `AUTH_SESSION` (httpOnly), `API_TOKEN` (client-readable), `AUTH_STATUS`.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

To create [API routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) add an `api/` directory to the `app/` directory with a `route.ts` file. For individual endpoints, create a subfolder in the `api` directory, like `api/hello/route.ts` would map to [http://localhost:3001/api/hello](http://localhost:3001/api/hello).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_source=github.com&utm_medium=referral&utm_campaign=turborepo-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
