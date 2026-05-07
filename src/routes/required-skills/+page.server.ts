import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { requestAccess } from '$lib/server/request_access';
import { type ProgressState, loadRequiredSkillProgressForAll, loadRequiredSkills, updateRequiredSkillProgress } from '$lib/server/required_skills';
import { checkAccess, checkAccessAnyRequired } from '$lib/server/roles';
import { getAllUsers, getUser, usersCache } from '$lib/server/users';
import { dropUserIdPrefix } from '$lib/util/users';

export async function load({ locals, platform }) {
  const roles = checkAccessAnyRequired(locals, [ 'coach', 'beginner', 'graduated_beginner' ]);
  if (!roles.includes('coach')) {
    redirect(302, `/required-skills/${dropUserIdPrefix(locals.auth().userId)}`);
  }
  const cache = usersCache(platform);

  // All users with the beginner role are loaded here. Graduated beginners can also view their own
  // historical feedback, but coaches only need to see active beginners.
  const users = (await getAllUsers(cache))
      .filter(user => user.roles.includes('beginner'))
      .sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));
  const [ requiredSkills, requiredSkillProgress ] = await Promise.all(
      [
        loadRequiredSkills(),
        loadRequiredSkillProgressForAll(users.map(user => user.user_id)),
      ]
  );

  return {
    users: users,
    required_skills: Map.groupBy(requiredSkills, skill => skill.stage),
    required_skill_progress: requiredSkillProgress,
  };
}

export const actions = {
  requestaccess: requestAccess,
  updateprogress: updateProgress,
} satisfies Actions;

async function updateProgress(req: WrappedRequest) {
  checkAccess(req.locals, 'coach');
  const cache = usersCache(req.platform);
  const data = await req.request.formData();

  const userId = data.get('userId')?.toString()!;
  const skillSlug = data.get('skill')?.toString()!;
  const progress = data.get('progress')?.toString();
  const feedback = data.get('feedback')?.toString().trim();

  const [ user, requiredSkills ] = await Promise.all(
      [
        getUser(userId, cache),
        loadRequiredSkills(),
      ]
  );

  // Verify that the user whose progress is being updated is in fact a beginner.
  if (!user.roles.includes('beginner')) {
    error(400, `User ${userId} is not a beginner`);
  }

  // Verify that progress is a valid value. Undefined is valid if it hasn't been updated.
  if (progress && !['Not started', 'In progress', 'Completed'].includes(progress)) {
    error(400, `Invalid progress provided: ${progress}`);
  }

  // Verify that skill slug is a valid skill.
  if (!requiredSkills.map(skill => skill.slug).includes(skillSlug)) {
    error(400, `Invalid skill slug: ${skillSlug}`);
  }

  let feedbackEntry;
  if (feedback) {
    if (feedback.length > 3000) {
      error(400, `Feedback text too long`);
    }

    const actor = await getUser(req.locals.auth().userId, cache);
    feedbackEntry = {
      author_name: actor.name,
      text: feedback,
    };
  }

  await updateRequiredSkillProgress(
      userId,
      skillSlug,
      progress as ProgressState | undefined,
      feedbackEntry
  );
  return { success: true };
}
