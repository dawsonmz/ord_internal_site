import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadSeasons, organizeSeasons } from '$lib/server/seasons';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ locals }) {
  await checkAccess(locals, ['member']);

  const seasons = organizeSeasons(await loadSeasons());
  const years = Array.from(seasons.keys());
  years.sort((lhs, rhs) => rhs - lhs);

  return { seasons, years };
}

export const actions = {
  sitefeedback: submitSiteFeedback,
  requestaccess: requestAccess,
} satisfies Actions;
