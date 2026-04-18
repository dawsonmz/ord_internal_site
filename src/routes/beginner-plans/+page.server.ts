import { checkAuthenticated } from '$lib/server/roles';
import { loadTrainingPlanSummaries } from '$lib/server/training_plans';

export async function load({ locals, url }) {
  checkAuthenticated(locals);
  const showHiddenParam = url.searchParams.get('show-hidden')?.trim().toLowerCase();
  return {
    seasons: await loadTrainingPlanSummaries(showHiddenParam == 'true'),
  };
}
