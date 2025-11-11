import type { Actions } from './$types';
import {fail } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';
import { sendNumberRequestNotification } from '$lib/server/emailer';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';
import { submitSiteFeedback } from '$lib/server/site_feedback';
import { loadSkaterVault } from '$lib/server/skater_vault';
import { missingError, numberError } from '$lib/util/validation';

export async function load({ locals }) {
  await checkAccess(locals, ['member']);
  const auth = locals.auth();
  const user = await clerkClient.users.getUser(auth.userId);
  return {
    email: user.primaryEmailAddress?.emailAddress,
    skater_numbers: await loadSkaterVault(),
  };
}

export const actions = {
  sitefeedback: submitSiteFeedback,
  requestaccess: requestAccess,
  requestnumber: submitNumberRequestAction,
} satisfies Actions;

async function submitNumberRequestAction(req: WrappedRequest) {
  await checkAccess(req.locals, ['member']);
  const data = await req.request.formData();

  const formId = data.get('formId')?.toString();
  const name = data.get('name')?.toString().trim();
  const number = data.get('number')?.toString().trim();
  const contact = data.get('contact')?.toString().trim();

  const errorsBody = {
    name: missingError(name),
    number: numberError(number),
    contact: missingError(contact),
  };

  if (errorsBody.name || errorsBody.number || errorsBody.contact) {
    return fail(400, { errors: errorsBody, formId });
  }

  await sendNumberRequestNotification(name!, number!, contact!);
  return {
    success: true,
    formId,
  };
}
