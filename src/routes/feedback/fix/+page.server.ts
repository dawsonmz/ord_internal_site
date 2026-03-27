import { error } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';
import { checkAccess } from '$lib/server/roles';
import { queryUserAllowances, updateUserAllowance } from '$lib/server/users';

export async function load({ locals }) {
  const roles = checkAccess(locals, ['member']);

  const auth = locals.auth();
  const isFeedbackWriterATeam = roles.includes('feedback_writer_a_team');
  const isFeedbackWriterBTeam = roles.includes('feedback_writer_b_team');

  // A user can view their own feedback, or feedback for A Team/B Team members if they have the right
  // permissions. If none of these are true, they will be rejected with an unauthorized error.
  if (!isFeedbackWriterATeam || !isFeedbackWriterBTeam) {
    error(403, 'Unauthorized resource');
  }

  const userAllowances = await queryUserAllowances();
  let count;
  let offset = 0;
  let users = [];
  do {
    const userPage = await clerkClient.users.getUserList({ limit: 100, offset });
    count = userPage.data.length;
    offset += 100;

    users.push(
        ...userPage.data
            .map(
                user => {
                  return {
                    user_id: user.id,
                    name: user.fullName!,
                  };
                }
            )
    );
  } while (count >= 100);

  console.log(`Users: ${JSON.stringify(users)}`);
  console.log(`Allowances: ${JSON.stringify(userAllowances)}`);

  users.forEach(async (user) => {
    let allowance = userAllowances.find(allowance => allowance.user_id == user.user_id);
    if (allowance) {
      console.log(`Updating for ${user.user_id} - ${user.name}`);
      let request = {
        user_id: user.user_id,
        user_name: user.name,
        allow_feedback_a_team: allowance.allow_feedback_a_team,
        allow_feedback_b_team: allowance.allow_feedback_b_team,
        stored_allow_feedback_a_team: allowance.allow_feedback_a_team,
        stored_allow_feedback_b_team: allowance.allow_feedback_b_team,
      };
      await updateUserAllowance(request);
    }
  });

  return {};
}
