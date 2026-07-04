// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Role as RoleType } from '$lib/util/roles';

declare global {
  export type Role = RoleType;

  interface UserPublicMetadata {
    roles?: Role[];
  }

  interface CustomJwtSessionClaims {
    metadata?: UserPublicMetadata,
  }

  namespace App {
    // interface Error {}
    interface Locals {
      user: User;
      auth: Auth;
    }

    interface Platform {
      env: Env;
    }

    // interface PageData {}
    // interface PageState {}
  }

  interface WrappedRequest {
    request: Request,
    locals: Locals,
    platform: Readonly<App.Platform> | undefined,
  }
}

export {};
