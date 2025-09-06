import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback_actions";
import { loadSeasons } from "$lib/server/training_plans";

export async function load() {
  return {
    seasons: await loadSeasons(),
  };
}

export const actions = {
  feedback: async ({ request }) => {
    return await submitFeedback(await request.formData());
  },
} satisfies Actions;

