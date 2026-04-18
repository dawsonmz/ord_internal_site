import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { loadAllRequiredSkillProgress } from '$lib/server/required_skills';
import { checkAccessAnyRequired } from '$lib/server/roles';

export async function load({ locals }) {
  checkAccessAnyRequired(locals, ['beginner', 'graduated_beginner', 'coach']);
  return {};
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
