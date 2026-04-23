import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { requestAccess } from '$lib/server/request_access';
import { loadRequiredSkillProgress, loadRequiredSkills } from '$lib/server/required_skills';
import { checkAccessAnyRequired } from '$lib/server/roles';
import { getUser } from '$lib/server/users';
import { addUserIdPrefix } from '$lib/util/users';

export async function load({ locals, params }) {
  const roles = checkAccessAnyRequired(locals, [ 'coach', 'beginner', 'graduated_beginner' ]);

  const actorId = locals.auth().userId;
  const userId = addUserIdPrefix(params.user);

  // Only coaches can view a different user's skills page.
  if (actorId != userId && !roles.includes('coach')) {
    error(404, 'User not found');
  }

  const user = await getUser(userId);
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
    user_name: user.name,
    required_skills: Map.groupBy(requiredSkills, skill => skill.stage),
    required_skill_progress: requiredSkillProgress,
  };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
