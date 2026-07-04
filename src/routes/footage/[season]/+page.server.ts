import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loadFootage, loadSeasonsWithFootage } from '$lib/server/footage';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';

export async function load({ locals, params }) {
  checkAccess(locals, 'member');
  const [ footage, seasons ] = await Promise.all([
    loadFootage(params.season),
    loadSeasonsWithFootage(),
  ]);

  const season = seasons.find(season => season.slug == params.season);
  if (!season) {
    error(404, 'Requested season not found.');
  }

  return { season, seasons, footage };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
