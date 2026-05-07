// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  export type Role =
      'admin' | 'member' | 'beginner' | 'graduated_beginner' | 'coach' | 'feedback_writer_a_team' | 'feedback_writer_b_team';
  
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
