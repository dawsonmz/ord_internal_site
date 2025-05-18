import { loadSeasons } from "$lib/server/training_plans";

export async function load() {
  return {
    seasons: await loadSeasons(),
  };
}
