import { sanityClient } from '$lib/util/sanity';

interface SkaterNumber {
  skater_number: string,
  derby_name: string,

  // Computed fields:
  derby_name_lower: string,
}

/**
 * @returns All skater numbers and derby names ordered in increasing order by number. Excludes those with temporary names.
 */
export async function loadSkaterVault(): Promise<SkaterNumber[]> {
  const skaterNumberData: SkaterNumber[] = await sanityClient.option.fetch(
    `*[_type == "skater_number" && temporary == false] | order(skater_number asc)`
  );

  // For faster search on the skater vault page.
  skaterNumberData.forEach((skaterNumber) => skaterNumber.derby_name_lower = skaterNumber.derby_name.toLowerCase());
  return skaterNumberData;
}
