# Oslo Roller Derby Website

Placeholder README.

## webapp

SvelteKit project for the webapp itself. To run locally, navigate to the /ord_app/webapp directory:

```bash
npm run dev
```

The local instance will be hosted at http://localhost:5173.

## Sanity

Sanity project that defines the schema and setup for Sanity Studio used by the webapp. To run Sanity Studio locally, navigate to the /ord_app/sanity directory:

```bash
npm run dev
```

The local instance will be hosted at http://localhost:3333. Note that it is still connected to actual CMS backend, so any changes to documents made there will be reflected in production.
