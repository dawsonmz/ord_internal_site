import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { loadAllRequiredSkillProgress } from '$lib/server/required_skills';
import { checkAccess } from '$lib/server/roles';

export async function load({ locals }) {
  checkAccess(locals, ['member']);
  return {};
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
