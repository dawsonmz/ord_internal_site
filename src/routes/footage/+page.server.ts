import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadSeasons } from '$lib/server/seasons';

export async function load({ locals }) {
  await checkAccess(locals, 'member');
  return { seasons: await loadSeasons() };
}

export const actions = {
  feedback: submitFeedback,
  requestaccess: requestAccess,
} satisfies Actions;
