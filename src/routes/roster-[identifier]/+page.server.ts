import type { Actions } from './$types';
import { loadRoster } from '$lib/server/rosters';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ params }) {
  return {
    roster: await loadRoster(params.identifier),
  };
}

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;
