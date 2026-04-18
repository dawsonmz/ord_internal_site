import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadSeasons, organizeSeasons } from '$lib/server/seasons';

export async function load({ locals }) {
  checkAccess(locals, 'member');

  const seasons = organizeSeasons(await loadSeasons());
  const years = Array.from(seasons.keys());
  years.sort((lhs, rhs) => rhs - lhs);

  return { seasons, years };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
