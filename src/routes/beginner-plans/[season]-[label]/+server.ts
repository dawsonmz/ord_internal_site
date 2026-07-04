import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Training plans were previously served from /beginner-plans/{season}-{label}.
export const GET: RequestHandler = ({ params, url }) => {
  redirect(301, `/beginner-plans/${params.season}/${params.label}${url.search}`);
};
