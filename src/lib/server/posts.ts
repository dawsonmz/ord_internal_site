import { sanityClient } from '$lib/util/sanity';

export interface Post {
  type: string,
  title: string,
  slug: string,
  date: string,
  author: string,
  visible: boolean,
  post: [],
}

export async function loadPosts(type: string, showHidden: boolean): Promise<Post[]> {
  const visibleFilter = showHidden ? '' : '&& visible';
  return await sanityClient.option.fetch(
    `*[_type == "post" && type == $type ${visibleFilter}] | order(date desc) {
      title,
      "slug": slug.current,
      date,
      author,
      visible,
      post,
    }`,
    { type },
  );
}
