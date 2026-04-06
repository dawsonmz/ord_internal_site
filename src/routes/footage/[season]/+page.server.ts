import type { Actions } from './$types';
import { loadFootage } from '$lib/server/footage';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadSeason } from '$lib/server/seasons';

export async function load({ locals, params }) {
  checkAccess(locals, ['member']);
  const [ season, footage ] = await Promise.all([
    loadSeason(params.season),
    loadFootage(params.season),
  ]);
  return { season, footage };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
