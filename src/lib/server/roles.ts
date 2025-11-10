import { error } from '@sveltejs/kit';

export async function checkAccess(locals: App.Locals, requiredRoles: Role[]): Promise<string[]> {
  const auth = locals.auth();
  if (!auth.userId) {
    error(401, 'Unauthenticated');
  }

  const roles = auth.sessionClaims?.metadata?.roles;
  if (!roles || requiredRoles.some(requiredRole => !roles.includes(requiredRole))) {
    error(403, 'Unauthorized resource');
  }

  return roles;
}
