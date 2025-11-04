import { sanityClient } from '$lib/util/sanity';

export interface Post {
  type: string,
  title: string,
  slug: string,
  date: string,
  author: string,
  post: [],
}

export async function loadPosts(type: string): Promise<Post[]> {
  return await sanityClient.option.fetch(
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
