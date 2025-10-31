import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { loadFootage } from '$lib/server/footage';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadSeason } from '$lib/server/seasons';

export async function load({ locals, params }) {
  await checkAccess(locals, ['member', 'admin']);
  const [ season, footage ] = await Promise.all([
    loadSeason(params.season),
    loadFootage(params.season),
  ]);
  return { season, footage };
}

export const actions = {
  feedback: submitFeedback,
  requestaccess: requestAccess,
} satisfies Actions;
