import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback";
import { loadSkaterNumbers } from "$lib/server/skater_numbers";

export async function load() {
  return { skater_numbers: await loadSkaterNumbers() };
}

export const actions = { feedback: submitFeedback } satisfies Actions;
