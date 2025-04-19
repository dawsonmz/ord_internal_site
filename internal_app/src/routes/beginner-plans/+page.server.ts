import { loadSeasons } from "$lib/server/seasons";
import { loadTrainingPlanSummaries } from "$lib/server/training_plans";

export async function load() {
    const [seasonData, trainingPlanSummaryData] = await Promise.all(
        [
            loadSeasons(),
            loadTrainingPlanSummaries(),
        ]
    );
    return {
        seasons: seasonData,
        training_plan_summaries: trainingPlanSummaryData,
    };
}
