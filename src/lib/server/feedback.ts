import { fail } from '@sveltejs/kit';
import { sendFeedbackNotification } from '$lib/server/emailer';

export async function submitFeedback(req: WrappedRequest) {
  const data = await req.request.formData();

  const formId = data.get('formId')?.toString();
  const contact = data.get('contact')?.toString().trim();
  const context = data.get('context')?.toString().trim();
  const text = data.get('text')?.toString().trim();

  const errorsBody = {
    text: missingError(text),
  };

  if (errorsBody.text) {
    return fail(400, { errors: errorsBody, formId });
  }

  await sendFeedbackNotification(context!, text!, contact);  
  return {
    success: true,
    formId,
  };
};

function missingError(field: string | undefined): string | null {
  return field ? null : 'Required field';
}
