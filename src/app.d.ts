// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  export type Role = 'admin' | 'member' | 'trainer';
  
  namespace App {
    // interface Error {}
    interface Locals {
      user: User;
      auth: Auth;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}

    interface CustomJwtSessionClaims {
      metadata: {
        roles?: Role[],
      }
    }
  }

  interface WrappedRequest {
    request: Request,
    locals: Locals,
  };
}

export {};
