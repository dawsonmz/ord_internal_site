import { checkAuthenticated } from '$lib/server/roles';
import { loadTrainingPlan } from '$lib/server/training_plans';

export async function load({ locals, params }) {
  checkAuthenticated(locals);
  return {
    training_plan: await loadTrainingPlan(params.season, params.label),
    narrow: true,
  };
}
