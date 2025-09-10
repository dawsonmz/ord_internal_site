import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback";
import { loadSeasons } from "$lib/server/training_plans";

export async function load({ url }) {
  const showHiddenParam = url.searchParams.get('show-hidden')?.trim().toLowerCase();
  return {
    seasons: await loadSeasons(showHiddenParam === 'true'),
  };
}

export const actions = { feedback: submitFeedback } satisfies Actions;

