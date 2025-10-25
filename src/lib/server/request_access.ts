import { error } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';
import { sendAccessRequest } from '$lib/server/emailer';

export async function requestAccess(req: WrappedRequest): Promise<any> {
  const auth = req.locals.auth();
  if (!auth.userId) {
    error(412, 'Access can only be requested when logged in.');
  }

  const userId = req.locals.auth().userId;
  const user = await clerkClient.users.getUser(userId);

  const data = await req.request.formData();
  const context = data.get('context')?.toString();

  await sendAccessRequest(userId, user.fullName, context!);
  
  return { success: true };
}
