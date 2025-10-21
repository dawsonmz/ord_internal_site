import type { Actions } from './$types';
import { NotFoundError } from '$lib/server/errors.js';
import { submitFeedback } from '$lib/server/feedback';
import { loadTrainingPlan } from '$lib/server/training_plans';

export async function load({ url, params }) {
  const showHiddenParam = url.searchParams.get('show-hidden')?.trim().toLowerCase();
  try {
    return { training_plan: await loadTrainingPlan(params.season, params.label, showHiddenParam === 'true') };
  } catch (error) {
    return {
      status: (error instanceof NotFoundError) ? 404 : 500,
      body: JSON.stringify(error),
    };
  }
}

export const actions = { feedback: submitFeedback } satisfies Actions;

