import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface Season {
    _id: String,
    season: String,
    year: Number,

    // Computed fields:
    display_text: String,
    short_text: String,
}

export interface SeasonRef {
    _ref: String,
}

/**
 * @returns All seasons, sorted in descending order by time (most recent seasons first)
 */
export async function loadSeasons(): Promise<Season[]> {
    const seasonData: Season[] = await sanityClientCredentials.option.fetch(`*[_type == "season"]`);
    if (seasonData) {
        seasonData.forEach(
            (season: Season) => {
                season.display_text = `${season.season} ${season.year}`;
                season.short_text = `${season.season.toLowerCase()}${season.year}`
            }
        );
        seasonData.sort(
            (lhs, rhs) => {
                if (lhs.year.valueOf() != rhs.year.valueOf()) {
                    return rhs.year.valueOf() - lhs.year.valueOf();
                }
                if (lhs.season === rhs.season) {
                    return 0;
                }
                return lhs.season === "Spring" ? 1 : -1;
            }
        );
        return seasonData;
    } else {
        throw new InternalError("Failed to load season data");
    }
}
