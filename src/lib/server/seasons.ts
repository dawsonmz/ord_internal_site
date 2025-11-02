import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/util/sanity';

export interface Season {
  name: string,
  slug: string,

  // Computed fields:
  period: string,
  year: number,
}

/**
 * @returns All seasons names and slugs
 */
export async function loadSeasons(): Promise<Season[]> {
  const seasons: Season[] = await sanityClient.option.fetch(
    `*[_type == "season"] | order(orderRank asc) {
      name,
      "slug": slug.current,
    }`
  );

  seasons.forEach(
      season => {
        const parts = season.name.split(' ');
        if (parts.length != 2) {
          error(500, `Malformed season: ${season.name}`);  
        }
        season.period = parts[0];
        season.year = Number.parseInt(parts[1]);
      }
  );
  return seasons;
}

export function organizeSeasons(seasons: Season[]): Map<number, Season[]> {
  const seasonsByYear: Map<number, Season[]> = Map.groupBy(seasons, season => season.year);
  seasonsByYear
      .values()
      .forEach(seasons => seasons.sort((lhs, rhs) => getPeriodRank(lhs.period) - getPeriodRank(rhs.period)));
  return seasonsByYear;
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

function getPeriodRank(period: string) {
  if (period == 'Spring') {
    return 1;
  }
  if (period == 'Summer') {
    return 2;
  }
  if (period == 'Fall') {
    return 3;
  }
  if (period == 'Winter') {
    return 4;
  }
  error(500, `Unexpected season period: ${period}`);
}
