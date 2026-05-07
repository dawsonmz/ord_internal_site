import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getUserFeedback, createFeedbackDocument } from '$lib/server/feedback';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { type User, getAllUsers, getUser, getUserAllowance, getUserAllowances, updateUserAllowance, usersCache } from '$lib/server/users';
import { addUserIdPrefix } from '$lib/util/users';
import { missingError } from '$lib/util/validation';

export async function load({ locals, url, platform }) {
  checkAccess(locals, 'member');
  const cache = usersCache(platform);

  const auth = locals.auth();
  const actorId = auth.userId;
  const paramUserId = url.searchParams.get('user');
  const userId = paramUserId ? addUserIdPrefix(paramUserId) : actorId;

  const isActorUser = actorId == userId;
  const actor = await getUser(actorId, cache);
  const isFeedbackWriterATeam = actor.roles.includes('feedback_writer_a_team');
  const isFeedbackWriterBTeam = actor.roles.includes('feedback_writer_b_team');

  // A user can view their own feedback, or feedback for A Team/B Team members if they have the right
  // permissions. If none of these are true, they will be rejected with an unauthorized error.
  if (!isActorUser && !isFeedbackWriterATeam && !isFeedbackWriterBTeam) {
    error(403, 'Unauthorized resource');
  }

  const user = isActorUser ? actor : await getUser(userId, cache);
  const [ feedbackEntries, userAllowances ] = await Promise.all(
      [  
        getUserFeedback(userId),
        getUserAllowances(),
      ]
  );

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

  // Only query Clerk for user list if the actor can view/write feedback for anyone.
  let aTeamUsers: User[] = [];
  let bTeamUsers: User[] = [];
  if (isFeedbackWriterATeam || isFeedbackWriterBTeam) {
    const allUsers = await getAllUsers(cache);
    aTeamUsers = allUsers.filter(user => user.user_id != actorId && usersAllowingA.includes(user.user_id));
    bTeamUsers = allUsers.filter(user => user.user_id != actorId && usersAllowingB.includes(user.user_id));
  }

  return {
    user_id: userId,
    user_name: user.name,
    actor_id: actorId,
    actor_name: actor.name,
    actor_allowance: actorAllowance,

    feedback_entries: Map.groupBy(filteredFeedbackEntries, feedback => feedback.context),
    can_write_a_team_feedback: isFeedbackWriterATeam && usersAllowingA.includes(userId),
    can_write_b_team_feedback: isFeedbackWriterBTeam && usersAllowingB.includes(userId),

    a_team_users: aTeamUsers,
    b_team_users: bTeamUsers,
  };
}

export const actions = {
  requestaccess: requestAccess,
  allowance: updateUserAllowanceAction,
  skaterfeedback: writeFeedback,
} satisfies Actions;

async function updateUserAllowanceAction(req: WrappedRequest) {
  checkAccess(req.locals, 'member');
  const auth = req.locals.auth();

  const data = await req.request.formData();
  const formId = data.get('formId')?.toString();
  const actorName = data.get('actorName')?.toString() ?? '';
  const allowA = data.get('allowA') != null;
  const allowB = data.get('allowB') != null;
  const storedAllowA = data.get('storedAllowA')?.toString() == 'true';
  const storedAllowB = data.get('storedAllowB')?.toString() == 'true';

  await updateUserAllowance(
      {
        user_id: auth.userId,
        user_name: actorName,
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
  const cache = usersCache(req.platform);
  const actor = await getUser(fromUser, cache);

  const errorsBody = {
    text: missingError(text),
  };
  if (errorsBody.text) {
    return fail(400, { errors: errorsBody, formId });
  }

  let requiredRole: Role;
  if (context == 'A Team') {
    requiredRole = 'feedback_writer_a_team';
  } else if (context == 'B Team') {
    requiredRole = 'feedback_writer_b_team';
  } else if (context == 'Self') {
    requiredRole = 'member';
  } else {
    error(400, `Invalid feedback context: ${context}`);
  }

  // Two ways potential unauthorized access cases: the actor doesn't have permission to view/write
  // feedback, or the user doesn't allow this type of feedback.
  if (!actor.roles.includes(requiredRole)) {
    error(403, 'Unauthorized resource');
  }
  if (context == 'A Team' || context == 'B Team') {
    const userAllowance = await getUserAllowance(userId);
    if (context == 'A Team' && !(userAllowance?.allow_feedback_a_team)) {
      error(403, 'Unauthorized resource');
    }
    if (context == 'B Team' && !(userAllowance?.allow_feedback_b_team)) {
      error(403, 'Unauthorized resource');
    }
  }

  await createFeedbackDocument(userId, context, actor.name, fromUser, text!);
  return {
    success: true,
    formId,
  };
}
