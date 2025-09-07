import { fail } from "@sveltejs/kit";
import { createDocument } from "$lib/server/firestore";
import type { WrappedRequest } from "$lib/server/request";

export async function submitFeedback(req: WrappedRequest) {
  const data = await req.request.formData();

  const formId = data.get('formId')?.toString();
  const contact = data.get('contact')?.toString().trim();
  const context = data.get('context')?.toString().trim();
  const text = data.get('text')?.toString().trim();

  const body = {
    fields: {
      contact: { stringValue: contact },
      context: { stringValue: context },
      text: { stringValue: text },
    },
  };

  await createDocument('feedback', body);
  return {
    success: true,
    formId,
  };
};
