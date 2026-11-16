import { checkAuthenticated } from '$lib/server/roles';
import { loadSeasonsWithTrainingPlans, loadTrainingPlanSummaries } from '$lib/server/training_plans';

export async function load({ locals, params }) {
  checkAuthenticated(locals);

  const [ season, seasons ] = await Promise.all([
    loadTrainingPlanSummaries(params.season),
    loadSeasonsWithTrainingPlans(),
  ]);

  return { season, seasons };
}
