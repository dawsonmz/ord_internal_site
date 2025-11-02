import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadSeasons, organizeSeasons } from '$lib/server/seasons';

export async function load({ locals }) {
  await checkAccess(locals, 'member');

  const seasons = organizeSeasons(await loadSeasons());
  const years = Array.from(seasons.keys());
  years.sort((lhs, rhs) => rhs - lhs);

  return { seasons, years };
}

export const actions = {
  feedback: submitFeedback,
  requestaccess: requestAccess,
} satisfies Actions;
