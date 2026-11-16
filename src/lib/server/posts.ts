import { getSanityClient } from '$lib/server/sanity';

export interface Post {
  type: string,
  title: string,
  slug: string,
  date: string,
  author: string,
  post: [],
}

export async function loadPosts(type: string): Promise<Post[]> {
  return await getSanityClient().fetch(
    `*[_type == "post" && type == $type] | order(date desc) {
      title,
      "slug": slug.current,
      date,
      author,
      post,
    }`,
    { type },
  );
}

export async function getLatestPostDate(type: string): Promise<string | null> {
  const results = await getSanityClient().fetch(
      `*[_type == "post" && type == $type] | order(date desc) {
        date,
      } [0..0]`,
       { type },
  );
  if (!results.length) {
    return null;
  }
  return results[0].date;
}
