import { createDocument } from "$lib/server/firestore";

interface WrappedRequest {
  request: Request
};

interface FeedbackDocument {
  fields: {
    contact: { stringValue: string | undefined },
    context: { stringValue: string | undefined },
    text: { stringValue: string | undefined },
  },
};

export async function submitFeedback(req: WrappedRequest) {
  const data = await req.request.formData();

  const contact = data.get('contact')?.toString();
  const context = data.get('context')?.toString();
  const text = data.get('text')?.toString();

  const body: FeedbackDocument = {
    fields: {
      contact: { stringValue: contact },
      context: { stringValue: context },
      text: { stringValue: text },
    },
  };

  const response = createDocument('feedback', JSON.stringify(body));
  console.log(`Response: ${JSON.stringify(response)}`);
  return { success: true };
};
