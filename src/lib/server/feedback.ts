import { type Filter, createDocument, queryDocuments } from '$lib/server/firestore';
import { formatDateTextWithYear } from '$lib/util/datetime';

export interface Feedback {
  user: string,
  context: string,
  timestamp: string,
  date: string,
  from: string,
  text: string,
}

export async function queryFeedbackByUser(user: string): Promise<Feedback[]> {
  return await queryFeedbackDocuments([{ field: 'user', op: 'EQUAL', value: user }]);
}

export async function queryFeedbackByContext(context: string): Promise<Feedback[]> {
  return await queryFeedbackDocuments([{ field: 'context', op: 'EQUAL', value: context }]);
}

export async function createFeedbackDocument(user: string, context: string, from: string, text: string): Promise<any> {
  const body = {
    fields: {
      user: { stringValue: user },
      context: { stringValue: context },
      from: { stringValue: from },
      text: { stringValue: text },
    },
  };
  return await createDocument('feedback', body);
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
          from: document.fields.from.stringValue,
          text: document.fields.text.stringValue,
        };
      }
  );
  results.sort((lhs: Feedback, rhs: Feedback) => rhs.timestamp.localeCompare(lhs.timestamp));
  return results;
}
