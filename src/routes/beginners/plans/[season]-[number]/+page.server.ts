import { NotFoundError } from "$lib/server/errors.js";
import { loadTrainingPlan } from "$lib/server/beginners/training_plans";

export async function load({ params }) {
    try {
        const trainingPlan = await loadTrainingPlan(params.season, params.number);
        return { training_plan: trainingPlan };
    } catch (error) {
        return {
            status: (error instanceof NotFoundError) ? 404 : 500,
            body: JSON.stringify(error),
        };
    }
}