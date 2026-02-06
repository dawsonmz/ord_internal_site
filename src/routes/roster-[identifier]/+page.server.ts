import type { Actions } from './$types';
import { checkAccess } from '$lib/server/roles';
import { loadRoster } from '$lib/server/rosters';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ locals, params }) {
  checkAccess(locals, ['member']);
  return {
    roster: await loadRoster(params.identifier),
  };
}

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;
