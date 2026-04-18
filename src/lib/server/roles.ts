import { error } from '@sveltejs/kit';

export function checkAuthenticated(locals: App.Locals): string[] {
  const auth = locals.auth();
  if (!auth.userId) {
    error(401, 'Unauthenticated');
  }

  return auth.sessionClaims?.metadata?.roles ?? [];
}

export function checkAccess(locals: App.Locals, requiredRole: Role): string[] {
  return checkAccessAllRequired(locals, [ requiredRole ]);
}

export function checkAccessAllRequired(locals: App.Locals, requiredRoles: Role[]): string[] {
  if (!requiredRoles.length) {
    error(500, 'Use checkAuthenticated instead');
  }

  const roles = checkAuthenticated(locals);
  if (requiredRoles.some(requiredRole => !roles.includes(requiredRole))) {
    error(403, 'Unauthorized resource');
  }

  return roles;
}

export function checkAccessAnyRequired(locals: App.Locals, requiredRoles: Role[]): string[] {
  if (!requiredRoles.length) {
    error(500, 'Empty requiredRoles input does not make sense here');
  }

  const roles = checkAuthenticated(locals);
  if (requiredRoles.some(requiredRole => roles.includes(requiredRole))) {
    return roles;
  }

  error(403, 'Unauthorized resource');
}
