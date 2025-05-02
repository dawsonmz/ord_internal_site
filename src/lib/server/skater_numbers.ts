import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface SkaterNumber {
  skater_number: String,
  derby_name: String,

  // Computed fields:
  derby_name_lower: String,
}

/**
 * @returns All skater numbers and derby names ordered in increasing order by number.
 */
export async function loadSkaterNumbers(): Promise<SkaterNumber[]> {
  const skaterNumberData: SkaterNumber[] = await sanityClientCredentials.option.fetch(`*[_type == "skater_number"] | order(skater_number asc)`);
  if (!skaterNumberData) {
    throw new InternalError("Failed to load training plan data.");
  }

  // For faster search on the skater vault page.
  skaterNumberData.forEach((skaterNumber) => skaterNumber.derby_name_lower = skaterNumber.derby_name.toLowerCase());
  return skaterNumberData;
}
