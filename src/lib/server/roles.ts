import { error } from '@sveltejs/kit';

export async function checkAccess(locals: App.Locals, role: Role) {
  const auth = locals.auth();
  if (!auth.userId) {
    error(401, 'Unauthenticated');
  }

  const roles = auth.sessionClaims?.metadata?.roles;
  if (!roles || !roles.includes(role)) {
    error(403, 'Unauthorized resource');
  }
}
