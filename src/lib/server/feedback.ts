import { type Filter, createDocument, queryDocuments } from '$lib/server/firestore';
import { formatDateTextWithYear } from '$lib/util/datetime';

export interface Feedback {
  user: string,
  context: string,
  timestamp: string,
  date: string,
  from_name: string,
  from_user: string,
  text: string,
}

export async function queryFeedbackByUser(user: string): Promise<Feedback[]> {
  return await queryFeedbackDocuments([
    {
      field: 'user',
      op: 'EQUAL',
      value: { stringValue: user },
    },
  ]);
}

export async function queryFeedbackByContext(context: string): Promise<Feedback[]> {
  return await queryFeedbackDocuments([
    {
      field: 'context',
      op: 'EQUAL',
      value: { stringValue: context },
    },
  ]);
}

export async function createFeedbackDocument(user: string, context: string, fromName: string, fromUser: string, text: string) {
  const body = {
    fields: {
      user: { stringValue: user },
      context: { stringValue: context },
      from_name: { stringValue: fromName },
      from_user: { stringValue: fromUser },
      text: { stringValue: text },
    },
  };
  await createDocument('feedback', body);
}

async function queryFeedbackDocuments(filters: Filter[]): Promise<Feedback[]> {
  const documents: any[] = await queryDocuments('feedback', filters);
  let results = documents.map(
      document => {
        return {
          user: document.fields.user.stringValue,
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
