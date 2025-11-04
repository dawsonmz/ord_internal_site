import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { loadPosts } from '$lib/server/posts';

export async function load() {
  return { posts: await loadPosts('Update') };
}

export const actions = { feedback: submitFeedback } satisfies Actions;
