import { loadTrainingPlans } from "$lib/server/training_plans";

export async function load() {
    return { training_plans: await loadTrainingPlans() };
}