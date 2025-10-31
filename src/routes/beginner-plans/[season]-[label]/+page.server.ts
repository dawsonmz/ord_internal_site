import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { loadTrainingPlan } from '$lib/server/training_plans';

export async function load({ url, params }) {
  const showHiddenParam = url.searchParams.get('show-hidden')?.trim().toLowerCase();
  return {
    training_plan: await loadTrainingPlan(params.season, params.label, showHiddenParam === 'true'),
  };
}

export const actions = { feedback: submitFeedback } satisfies Actions;

