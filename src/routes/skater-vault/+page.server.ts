import { loadSkaterNumbers } from "$lib/server/skater_numbers";

export async function load() {
  return { skater_numbers: await loadSkaterNumbers() };
}
