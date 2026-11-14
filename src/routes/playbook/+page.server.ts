import type { Actions } from './$types';
import { loadPlaysByScenario } from '$lib/server/plays';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';

export async function load({ locals }) {
  checkAccess(locals, 'member');
  return { scenarios: await loadPlaysByScenario() };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
