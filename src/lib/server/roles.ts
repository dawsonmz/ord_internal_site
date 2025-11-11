import { error } from '@sveltejs/kit';

export function checkAccess(locals: App.Locals, requiredRoles: Role[]): string[] {
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
