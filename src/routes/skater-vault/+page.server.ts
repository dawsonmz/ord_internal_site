import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback";
import { loadSkaterVault, submitNumberRequest } from "$lib/server/skater_vault";

export async function load() {
  return { skater_numbers: await loadSkaterVault() };
}

export const actions = {
  feedback: submitFeedback,
  requestnumber: submitNumberRequest,
} satisfies Actions;
