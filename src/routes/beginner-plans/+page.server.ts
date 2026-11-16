import { checkAuthenticated } from '$lib/server/roles';
import { loadSeasonsWithTrainingPlans, loadTrainingPlanSummaries } from '$lib/server/training_plans';

export async function load({ locals }) {
  checkAuthenticated(locals);

  const seasons = await loadSeasonsWithTrainingPlans();
  const season = seasons.length ? await loadTrainingPlanSummaries(seasons[0].slug) : null;

  return { seasons, season };
}
