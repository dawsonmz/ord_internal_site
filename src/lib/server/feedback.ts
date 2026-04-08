import { createDocument, getDocuments } from '$lib/server/firestore';
import { formatDateTextWithYear } from '$lib/util/datetime';

export interface Feedback {
  context: string,
  timestamp: string,
  date: string,
  from_name: string,
  from_user: string,
  text: string,
}

export async function getUserFeedback(userId: string): Promise<Feedback[]> {
  const documents: any[] = await getDocuments([{ collection: 'user', document_id: userId }], 'feedback');
  let results = documents.map(
      document => {
        return {
          context: document.fields.context.stringValue,
          timestamp: document.createTime,
          date: formatDateTextWithYear(document.createTime),
          from_name: document.fields.from_name.stringValue,
          from_user: document.fields.from_user.stringValue,
          text: document.fields.text.stringValue,
        };
      }
  );
  results.sort((lhs: Feedback, rhs: Feedback) => rhs.timestamp.localeCompare(lhs.timestamp));
  return results;
}

export async function createFeedbackDocument(userId: string, context: string, fromName: string, fromUser: string, text: string) {
  const body = {
    fields: {
      context: { stringValue: context },
      from_name: { stringValue: fromName },
      from_user: { stringValue: fromUser },
      text: { stringValue: text },
    },
  };
  await createDocument([{ collection: 'user', document_id: userId }], 'feedback', body);
}
