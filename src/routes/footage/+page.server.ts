import type { Actions } from './$types';
import { loadFootage, loadSeasonsWithFootage } from '$lib/server/footage';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';

export async function load({ locals }) {
  checkAccess(locals, 'member');

  const seasons = await loadSeasonsWithFootage();
  const footage = seasons.length ? await loadFootage(seasons[0].slug) : new Map();

  return { seasons, footage };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
