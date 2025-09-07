import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback";
import { loadSeasons } from "$lib/server/training_plans";

export async function load() {
  return {
    seasons: await loadSeasons(),
  };
}

export const actions = { feedback: submitFeedback } satisfies Actions;

