import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { loadPosts } from '$lib/server/posts';

export async function load({ url }) {
  const showHiddenParam = url.searchParams.get('show-hidden')?.trim().toLowerCase();
  return { posts: await loadPosts('Update', showHiddenParam === 'true') };
}

export const actions = { feedback: submitFeedback } satisfies Actions;
