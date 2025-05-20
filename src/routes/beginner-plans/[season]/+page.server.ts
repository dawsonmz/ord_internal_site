import { NotFoundError } from "$lib/server/errors.js";
import { loadTrainingPlansInSeason } from "$lib/server/training_plans";

export async function load({ params }) {
  try {
    return {
      season: await loadTrainingPlansInSeason(params.season),
    };
  } catch (error) {
    return {
      status: (error instanceof NotFoundError) ? 404 : 500,
      body: JSON.stringify(error),
    };
  }
}
