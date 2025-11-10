import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ locals }) {
  await checkAccess(locals, ['member']);
  return {};
}

export const actions = {
  sitefeedback: submitSiteFeedback,
  requestaccess: requestAccess,
} satisfies Actions;
