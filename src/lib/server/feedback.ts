import { createDocument } from "$lib/server/firestore";

interface WrappedRequest {
  request: Request
};

export async function submitFeedback(req: WrappedRequest) {
  const data = await req.request.formData();

  const contact = data.get('contact')?.toString();
  const context = data.get('context')?.toString();
  const text = data.get('text')?.toString();

  const body = {
    fields: {
      contact: { stringValue: contact },
      context: { stringValue: context },
      text: { stringValue: text },
    },
  };

  await createDocument('feedback', body);
  return { success: true };
};
