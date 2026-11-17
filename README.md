# Oslo Roller Derby internal website

SvelteKit project for the internal ORD website. Hosted as a Cloudflare worker with automatic deployments from the `main` branch.

To run locally with automatic reload on local changes:

```bash
pnpm dev
```

Production version hosted at https://internal.oslorollerderby.workers.dev.

# Sanity Studio

`studio` contains the Sanity Studio project for the database that serves content for the internal website.
Hosted on Sanity directly with automatic deployments from the `main` branch.

To run Sanity Studio locally, run:

```bash
pnpm studio:dev
```

The local instance will be hosted at http://localhost:3333. Note that it is still connected to the production Sanity content lake, so any changes to documents made there will be reflected in production.
