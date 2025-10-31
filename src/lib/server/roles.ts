import { error } from '@sveltejs/kit';

export async function checkAccess(locals: App.Locals, rolesWithAccess: Roles[]) {
  const auth = locals.auth();
  if (!auth.userId) {
    error(401, 'Unauthenticated');
  }

  if (rolesWithAccess.length) { 
    const role = auth.sessionClaims?.metadata?.role;
    if (!role || !rolesWithAccess.includes(role)) {
      error(403, 'Unauthorized resource');
    }
  }
}
