import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { requestAccess } from '$lib/server/request_access';
import { loadRequiredSkillProgress, loadRequiredSkills, updateRequiredSkillProgress } from '$lib/server/required_skills';
import { checkAccess, checkAccessAnyRequired } from '$lib/server/roles';
import { getUser, usersCache } from '$lib/server/users';
import { addUserIdPrefix } from '$lib/util/users';

export async function load({ locals, params, platform }) {
  const roles = checkAccessAnyRequired(locals, [ 'coach', 'beginner', 'graduated_beginner' ]);

  const actorId = locals.auth().userId;
  const userId = addUserIdPrefix(params.user);

  if (actorId != userId && !roles.includes('coach')) {
    error(404, 'User not found');
  }
  const cache = usersCache(platform);

  const user = await getUser(userId, cache);
  if (!user.roles.includes('beginner') && !user.roles.includes('graduated_beginner')) {
    error(404, 'User not found');
  }

  const [ requiredSkills, requiredSkillProgress ] = await Promise.all(
      [
        loadRequiredSkills(),
        loadRequiredSkillProgress(userId),
      ]
  );

  for (const skill of requiredSkills) {
    if (!(skill.slug in requiredSkillProgress)) {
      requiredSkillProgress[skill.slug] = {
        user_id: userId,
        skill_slug: skill.slug,
        progress: 'Not started',
        feedback: [],
      };
    }
  }
  
  return {
    user: user,
    can_edit_progress: roles.includes('coach') && user.roles.includes('beginner'),
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
