import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback";
import { loadRoster } from "$lib/server/rosters";

export async function load({ params }) {
  return {
    roster: await loadRoster(params.identifier),
  };
}

export const actions = { feedback: submitFeedback } satisfies Actions;
