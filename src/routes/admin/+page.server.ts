import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { getAllUsers, updateUserRoles, usersCache } from '$lib/server/users';
import { ROLES } from '$lib/util/roles';

export async function load({ locals, platform }) {
  checkAccess(locals, 'admin');
  const cache = usersCache(platform);
  const users = [ ...await getAllUsers(cache) ].sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));

  return {
    users,
    actor_user_id: locals.auth().userId,
  };
}

export const actions = {
  requestaccess: requestAccess,
  update: updateRoles,
} satisfies Actions;

async function updateRoles(req: WrappedRequest) {
  checkAccess(req.locals, 'admin');
  const cache = usersCache(req.platform);
  const data = await req.request.formData();

  const jsonData = data.get('updates')?.toString();
  if (!jsonData) {
    error(400, 'Missing updates payload');
  }

  let parsedData: unknown;
  try {
    parsedData = JSON.parse(jsonData);
  } catch {
    error(400, 'Invalid updates payload');
  }
  if (!Array.isArray(parsedData)) {
    error(400, 'Updates must be an array');
  }

  const actorUserId = req.locals.auth().userId;
  const updates: { user_id: string, roles: Role[] }[] = [];
  for (const entry of parsedData) {
    if (typeof entry?.user_id != 'string' || !Array.isArray(entry?.roles)) {
      error(400, 'Malformed update entry');
    }
    if (!entry.roles.every(isRole)) {
      error(400, `Unknown role in update for ${entry.user_id}`);
    }
    if (entry.user_id == actorUserId && !entry.roles.includes('admin')) {
      error(400, 'You cannot remove your own admin role');
    }
    updates.push({ user_id: entry.user_id, roles: entry.roles });
  }

  const results = await Promise.allSettled(
      updates.map(update => updateUserRoles(update.user_id, update.roles)),
  );

  const failures: { user_id: string, message: string }[] = [];
  results.forEach(
      (result, idx) => {
        if (result.status == 'rejected') {
          failures.push({
            user_id: updates[idx].user_id,
            message: result.reason?.message ?? 'Unknown error',
          });
        }
      }
  );

  if (results.some(result => result.status == 'fulfilled')) {
    await cache.delete('users:all');
  }

  return { failures };
}

function isRole(value: unknown): value is Role {
  return typeof value == 'string' && (ROLES as readonly string[]).includes(value);
}
