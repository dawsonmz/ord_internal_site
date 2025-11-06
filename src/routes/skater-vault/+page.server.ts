import type { Actions } from './$types';
import { clerkClient } from 'svelte-clerk/server';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { submitSiteFeedback } from '$lib/server/site_feedback';
import { loadSkaterVault, submitNumberRequest } from '$lib/server/skater_vault';

export async function load({ locals }) {
  await checkAccess(locals, 'member');
  const auth = locals.auth();
  const user = await clerkClient.users.getUser(auth.userId);
  return {
    email: user.primaryEmailAddress?.emailAddress,
    skater_numbers: await loadSkaterVault(),
  };
}

export const actions = {
  sitefeedback: submitSiteFeedback,
  requestaccess: requestAccess,
  requestnumber: submitNumberRequest,
} satisfies Actions;
