# Oslo Roller Derby Website

Placeholder README.

## `internal_app`

SvelteKit project for the internal ORD website. Hosted on Cloudflare Pages with automatic deployments from the `main` branch.

To run locally, navigate to the /ord_app/internal directory and run:

```bash
npm run dev
```

The local instance will be hosted at http://localhost:5173.

## `internal_studio`

Sanity project that defines the schema and setup for Sanity Studio used by the internal website. Hosted on Cloudflare Pages with automatic deployments from the `main` branch.

To run Sanity Studio locally, navigate to the /ord_app/internal_studio directory and run:

```bash
npm run dev
```

The local instance will be hosted at http://localhost:3333. Note that it is still connected to the production Sanity content lake, so any changes to documents made there will be reflected in production.
