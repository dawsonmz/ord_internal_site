import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { loadSkaterVault, submitNumberRequest } from '$lib/server/skater_vault';

export async function load({ locals }) {
  await checkAccess(locals, 'member');
  return { skater_numbers: await loadSkaterVault() };
}

export const actions = {
  feedback: submitFeedback,
  requestaccess: requestAccess,
  requestnumber: submitNumberRequest,
} satisfies Actions;
