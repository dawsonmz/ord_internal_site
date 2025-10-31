import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/server/sanity';
import { formatDateText } from '$lib/util/datetime';

interface Footage {
  title: string,
  event: string,
  type: string,
  date: string,
  id: string | null,
  start_seconds: number | null,
  other_link: string | null,

  // Computed fields:
  date_text: string,
}

/**
 * @param season The slug value for the season from which footage should be loaded
 * @returns Map with all footage for a given season, keyed by footage type
 */
export async function loadFootage(season: string): Promise<Map<string, Footage[]>> {
  const footageData = await sanityClient.option.fetch(
      `*[_type == "footage" && season->slug.current == $season] | order(orderRank asc) {
        title,
        event,
        type,
        date,
        id,
        start_seconds,
        other_link,
      }`,
      { season }
  );

  if (!footageData.length) {
    error(404, 'Season was not found.');
  }

  footageData.forEach((footage: Footage) => footage.date_text = formatDateText(footage.date));
  return Map.groupBy(footageData, (footage: Footage) => footage.type);
}
