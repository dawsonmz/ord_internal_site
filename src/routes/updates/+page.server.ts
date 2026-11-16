import { loadPosts } from '$lib/server/posts';

export async function load() {
  return { posts: await loadPosts('Update'), narrow: true };
}
