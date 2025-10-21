import { InternalError, NotFoundError } from '$lib/server/errors';
import { sanityClient } from '$lib/server/sanity';

interface Roster {
  name: String,
  short_name: String,
  season: String,
  line_a_name: String,
  line_a: SkaterNumber[],
  line_b_name: String,
  line_b: SkaterNumber[],
  jammers: SkaterNumber[],
  bench: SkaterNumber[],
}

interface SkaterNumber {
  skater_number: String,
  derby_name: String,
}

/**
 * @returns The roster with the specified identifier.
 */
export async function loadRoster(identifier: string): Promise<Roster> {
  const rosterData: Roster[] = await sanityClient.option.fetch(
    `*[_type == "roster" && slug.current == $identifier] {
      name,
      short_name,
      "season": season->name,
      line_a_name,
      line_a[]-> {
        skater_number,
        derby_name,
      },
      line_b_name,
      line_b[]-> {
        skater_number,
        derby_name,
      },
      jammers[]-> {
        skater_number,
        derby_name,
      },
      bench[]-> {
        skater_number,
        derby_name,
      },
    }`,
    { identifier }
  );

  if (!rosterData) {
    throw new NotFoundError("Roster not found");
  } else if (rosterData.length > 1) {
    throw new InternalError("More than one roster returned from query");
  }

  return rosterData[0];
}
