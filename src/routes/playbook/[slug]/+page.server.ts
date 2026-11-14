import type { Actions } from './$types';
import { loadPlay } from '$lib/server/plays';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';

export async function load({ locals, params }) {
  checkAccess(locals, 'member');
  return { play: await loadPlay(params.slug) };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
