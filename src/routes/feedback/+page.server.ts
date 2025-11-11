import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';
import { queryFeedbackByUser, createFeedbackDocument } from '$lib/server/feedback';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { submitSiteFeedback } from '$lib/server/site_feedback';
import { type UserName, queryUserAllowance, queryUserAllowances, updateUserAllowance } from '$lib/server/users';
import { missingError } from '$lib/util/validation';

export async function load({ locals, url }) {
  const roles = checkAccess(locals, ['member']);

  const auth = locals.auth();
  let actorId = auth.userId;
  let userId = url.searchParams.get('user');
  userId = userId ? `user_${userId}` : actorId;
  
  const isActorUser = actorId == userId;
  const isFeedbackWriterATeam = roles.includes('feedback_writer_a_team');
  const isFeedbackWriterBTeam = roles.includes('feedback_writer_b_team');

  // A user can view their own feedback, or feedback for A Team/B Team members if they have the right
  // permissions. If none of these are true, they will be rejected with an unauthorized error.
  if (!isActorUser && !isFeedbackWriterATeam && !isFeedbackWriterBTeam) {
    error(403, 'Unauthorized resource');
  }

  let actorName: string;
  let userName: string;
  try {
    const [ actor, user ] = await Promise.all([
      clerkClient.users.getUser(actorId),
      clerkClient.users.getUser(userId!),
    ]);
    actorName = actor.fullName!
    userName = user.fullName!;
  } catch (err: any) {
    if (err.status == 404) {
      error(404, 'User not found');
    } else {
      error(500, 'Internal server error');
    }
  }

  const [ feedbackEntries, userAllowances ] = await Promise.all([  
    queryFeedbackByUser(userId!),
    queryUserAllowances(),
  ]);

  // Show all feedback if the actor is viewing their own page. Otherwise, only show feedback
  // of the type that the actor has permission to view or write.
  const filteredFeedbackEntries = feedbackEntries.filter(
      feedback => {
        if (feedback.context == 'A Team') {
          return isActorUser || isFeedbackWriterATeam;
        } else if (feedback.context == 'B Team') {
          return isActorUser || isFeedbackWriterBTeam;
        } else if (feedback.context == 'Self') {
          return isActorUser;
        } else {
          return false;
        }
      }
  );

  const actorAllowance = userAllowances.find(user => user.user_id == actorId)
      ?? {
        user_id: actorId,
        allow_feedback_a_team: false,
        allow_feedback_b_team: false,
      };

  // If the actor has the right permissions, they can see a list of users allowing
  // the relevant type of feedback.
  const usersAllowingA = isFeedbackWriterATeam ? userAllowances.filter(user => user.allow_feedback_a_team).map(user => user.user_id) : [];
  const usersAllowingB = isFeedbackWriterBTeam ? userAllowances.filter(user => user.allow_feedback_b_team).map(user => user.user_id) : [];

  let aTeamUsers: UserName[] = [];
  let bTeamUsers: UserName[] = [];
  if (isFeedbackWriterATeam || isFeedbackWriterBTeam) {
    let count: number;
    let offset = 0;
    do {
      const userPage = await clerkClient.users.getUserList({ limit: 100, offset });
      count = userPage.data.length;
      offset += 100;

      aTeamUsers.push(
          ...userPage.data
              .filter(user => user.id != actorId && usersAllowingA.includes(user.id))
              .map(
                  user => {
                    return {
                      user_id: user.id,
                      name: user.fullName!,
                    };
                  }
              )
      );
      bTeamUsers.push(
          ...userPage.data
              .filter(user => user.id != actorId && usersAllowingB.includes(user.id))
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
  }

  return {
    user_id: userId,
    user_name: userName,
    actor_id: actorId,
    actor_name: actorName,
    actor_allowance: actorAllowance,

    feedback_entries: Map.groupBy(filteredFeedbackEntries, feedback => feedback.context),
    can_write_a_team_feedback: isFeedbackWriterATeam && usersAllowingA.includes(userId!),
    can_write_b_team_feedback: isFeedbackWriterBTeam && usersAllowingB.includes(userId!),

    a_team_users: aTeamUsers,
    b_team_users: bTeamUsers,
  };
}

export const actions = {
  sitefeedback: submitSiteFeedback,
  requestaccess: requestAccess,
  allowance: updateUserAllowanceAction,
  skaterfeedback: writeFeedback,
} satisfies Actions;

async function updateUserAllowanceAction(req: WrappedRequest) {
  checkAccess(req.locals, ['member']);
  const auth = req.locals.auth();

  const data = await req.request.formData();
  const formId = data.get('formId')?.toString();
  const allowA = data.get('allowA') != null;
  const allowB = data.get('allowB') != null;
  const storedAllowA = data.get('storedAllowA')?.toString() == 'true';
  const storedAllowB = data.get('storedAllowB')?.toString() == 'true';

  await updateUserAllowance(
      {
        user_id: auth.userId,
        allow_feedback_a_team: allowA,
        allow_feedback_b_team: allowB,
        stored_allow_feedback_a_team: storedAllowA,
        stored_allow_feedback_b_team: storedAllowB,
      },
  );
  return {
    success: true,
    formId,
  };
}

async function writeFeedback(req: WrappedRequest) {
  const data = await req.request.formData();
  const formId = data.get('formId')!.toString();
  const userId = data.get('userId')!.toString();
  const context = data.get('context')!.toString();
  const fromUser = data.get('fromUser')!.toString();
  const text = data.get('text')?.toString();

  if (fromUser != req.locals.auth().userId) {
    error(403, 'Unauthorized resource');
  }
  const actor = await clerkClient.users.getUser(fromUser);

  const errorsBody = {
    text: missingError(text),
  };

  if (errorsBody.text) {
    return fail(400, { errors: errorsBody, formId });
  }
  
  let requiredRoles: Role[] = ['member'];
  if (context == 'A Team') {
    requiredRoles.push('feedback_writer_a_team');
  } else if (context == 'B Team') {
    requiredRoles.push('feedback_writer_b_team');
  } else if (context != 'Self') {
    error(400, `Invalid feedback context: ${context}`);
  }

  checkAccess(req.locals, requiredRoles);
  if (context == 'A Team' || context == 'B Team') {
    const userAllowance = await queryUserAllowance(userId!);
    if (context == 'A Team' && !(userAllowance?.allow_feedback_a_team)) {
      error(403, 'Unauthorized resource');
    }
    if (context == 'B Team' && !(userAllowance?.allow_feedback_b_team)) {
      error(403, 'Unauthorized resource');
    }
  }

  await createFeedbackDocument(userId, context, actor.fullName!, fromUser, text!);
  return {
    success: true,
    formId,
  };
}
