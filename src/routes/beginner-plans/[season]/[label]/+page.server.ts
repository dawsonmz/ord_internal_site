import { NotFoundError } from "$lib/server/errors.js";
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