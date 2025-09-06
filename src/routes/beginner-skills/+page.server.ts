import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback_actions";

export const actions = {
  feedback: async ({ request }) => {
    return await submitFeedback(await request.formData());
  },
} satisfies Actions;
