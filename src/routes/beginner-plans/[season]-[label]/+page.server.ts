import type { Actions } from "./$types";
import { NotFoundError } from "$lib/server/errors.js";
import { submitFeedback } from "$lib/server/feedback_actions";
import { loadTrainingPlan } from "$lib/server/training_plans";

export async function load({ params }) {
  try {
    return { training_plan: await loadTrainingPlan(params.season, params.label) };
  } catch (error) {
    return {
      status: (error instanceof NotFoundError) ? 404 : 500,
      body: JSON.stringify(error),
    };
  }
}

export const actions = {
  feedback: async ({ request }) => {
    return await submitFeedback(await request.formData());
  },
} satisfies Actions;

