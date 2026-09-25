import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { requestAccess } from '$lib/server/request_access';
import { loadRequiredSkillProgressForAll, loadRequiredSkills, updateRequiredSkillProgress } from '$lib/server/required_skills';
import { checkAccess, checkAccessAnyRequired } from '$lib/server/roles';
import { getAllUsers, usersCache } from '$lib/server/users';
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
  const data = await req.request.formData();

  await updateRequiredSkillProgress(
      req.locals.auth().userId,
      data.get('userId')?.toString()!,
      data.get('skill')?.toString()!,
      data.get('progress')?.toString(),
      data.get('feedback')?.toString().trim(),
      usersCache(req.platform),
  );
  return { success: true };
}
