import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadRoster } from '$lib/server/rosters';

export async function load({ locals, params }) {
  checkAccess(locals, 'member');
  return {
    roster: await loadRoster(params.identifier),
  };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
