import { checkAuthenticated } from '$lib/server/roles';
import { loadSeasonsWithTrainingPlans, loadTrainingPlanSummaries } from '$lib/server/training_plans';

export async function load({ locals, url, params }) {
  checkAuthenticated(locals);
  const showHidden = url.searchParams.get('show-hidden')?.trim().toLowerCase() == 'true';

  const [ season, seasons ] = await Promise.all([
    loadTrainingPlanSummaries(params.season, showHidden),
    loadSeasonsWithTrainingPlans(showHidden),
  ]);

  return { season, seasons };
}
