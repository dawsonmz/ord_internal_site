import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';

export async function load({ locals, params }) {
  await checkAccess(locals, 'member');
  return {};
}

export const actions = {
  feedback: submitFeedback,
  requestaccess: requestAccess,
} satisfies Actions;
