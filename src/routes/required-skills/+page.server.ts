import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { loadRequiredSkillProgressForAll, loadRequiredSkills } from '$lib/server/required_skills';
import { checkAccessAnyRequired } from '$lib/server/roles';

export async function load({ locals }) {
  checkAccessAnyRequired(locals, [ 'coach' ]);
  const [ requiredSkills, requiredSkillProgress ] = await Promise.all(
      [
        loadRequiredSkills(),
        loadRequiredSkillProgressForAll([]),
      ]
  );
  return {};
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
