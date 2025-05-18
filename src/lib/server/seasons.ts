import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface Season {
  season: String,
  short_text: String,
}

/**
 * @returns All seasons
 */
export async function loadSeasons(): Promise<Season[]> {
  const seasonsData: { seasons: String[] }[] = await sanityClientCredentials.option.fetch(`*[_type == "seasons"]`);
  if (seasonsData) {
    return seasonsData[0].seasons.map(
        (season) => {
          return {
            season: season,
            short_text: season.toLowerCase().replaceAll(' ', ''),
          };
        },
    );
  } else {
    throw new InternalError("Failed to load season data");
  }
}
