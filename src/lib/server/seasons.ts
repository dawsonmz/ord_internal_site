import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/util/sanity';

export interface Season {
  name: string,
  slug: string,
}

/**
 * @returns All seasons names and slugs
 */
export async function loadSeasons(): Promise<Season[]> {
  return await sanityClient.option.fetch(
    `*[_type == "season"] | order(orderRank asc) {
      name,
      "slug": slug.current,
    }`
  );
}

/**
 * @returns The season with the specified slug
 */
export async function loadSeason(season: string): Promise<Season> {
  const seasonData = await sanityClient.option.fetch(
    `*[_type == "season" && slug.current == $season] {
      name,
      "slug": slug.current,
    }`,
    { season }
  );

  if (!seasonData.length) {
    error(404, 'Requested season not found.');
  } else if (seasonData.length > 1) {
    error(500, 'More than one season found.');
  }
  return seasonData[0];
}
