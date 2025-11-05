import type { Actions } from './$types';
import { submitSiteFeedback } from '$lib/server/site_feedback';
import { loadTrainingPlan } from '$lib/server/training_plans';

export async function load({ url, params }) {
  const showHiddenParam = url.searchParams.get('show-hidden')?.trim().toLowerCase();
  return {
    training_plan: await loadTrainingPlan(params.season, params.label, showHiddenParam === 'true'),
  };
}

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;

