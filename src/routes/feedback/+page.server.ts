import type { Actions } from './$types';
import { clerkClient } from 'svelte-clerk/server';
import { queryFeedbackByUser } from '$lib/server/feedback';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ locals }) {
  await checkAccess(locals, 'member');
  const auth = locals.auth();
  const [ user, feedbackEntries ] = await Promise.all([
    clerkClient.users.getUser(auth.userId),
    queryFeedbackByUser(auth.userId),
  ]);

  return {
    name: user.firstName,
    feedback_entries: Map.groupBy(feedbackEntries, feedback => feedback.context),
  };
}

export const actions = {
  sitefeedback: submitSiteFeedback,
  requestaccess: requestAccess,
} satisfies Actions;
