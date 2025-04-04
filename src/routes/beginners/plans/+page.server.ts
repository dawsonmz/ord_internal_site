import { loadSeasons } from "$lib/server/seasons";
import { loadTrainingPlans } from "$lib/server/beginners/training_plans";

export async function load() {
    let [seasonData, trainingPlanData] = await Promise.all(
        [
            loadSeasons(),
            loadTrainingPlans(),
        ]
    );
    return {
        seasons: seasonData,
        training_plans: trainingPlanData,
    };
}
