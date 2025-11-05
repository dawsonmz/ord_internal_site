import type { Actions } from './$types';
import { loadPosts } from '$lib/server/posts';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ url }) {
  const showHiddenParam = url.searchParams.get('show-hidden')?.trim().toLowerCase();
  return { posts: await loadPosts('Update', showHiddenParam === 'true') };
}

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;
