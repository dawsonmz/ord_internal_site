import { error } from '@sveltejs/kit';
import { type FieldUpdate, createDocument, patchDocument, queryDocuments } from '$lib/server/firestore';

export interface UserName {
  user_id: string,
  name: string,
}

export interface UserAllowance {
  document_name: string,
  user_id: string,
  allow_feedback_a_team: boolean,
  allow_feedback_b_team: boolean,
}

export interface UserAllowanceRequest {
  user_id: string,
  allow_feedback_a_team: boolean,
  allow_feedback_b_team: boolean,
  stored_allow_feedback_a_team: boolean,
  stored_allow_feedback_b_team: boolean,
}

export async function queryUserAllowances(): Promise<UserAllowance[]> {
  const results = await queryDocuments('user', []);
  return results.map(
      (document: any) => {
        return {
          document_name: document.name,
          user_id: document.fields.id.stringValue,
          allow_feedback_a_team: document.fields.allow_feedback_a_team?.booleanValue ?? false,
          allow_feedback_b_team: document.fields.allow_feedback_b_team?.booleanValue ?? false,
        };
      },
  );
}

export async function queryUserAllowance(userId: string): Promise<UserAllowance | null> {
  const results = await queryDocuments(
      'user',
      [
        {
          field: 'id',
          op: 'EQUAL',
          value: { stringValue: userId },
        },
      ]
  );
  if (!results.length) {
    return null;
  } else if (results.length > 1) {
    error(500, `Too many user allowance documents with id ${userId}`);
  } else {
    return {
      document_name: results[0].name,
      user_id: results[0].fields.id.stringValue,
      allow_feedback_a_team: results[0].fields.allow_feedback_a_team?.booleanValue ?? false,
      allow_feedback_b_team: results[0].fields.allow_feedback_b_team?.booleanValue ?? false,
    };
  }
}

export async function updateUserAllowance(request: UserAllowanceRequest) {
  const allowA = request.allow_feedback_a_team;
  const allowB = request.allow_feedback_b_team;
  const storedAllowA = request.stored_allow_feedback_a_team;
  const storedAllowB = request.stored_allow_feedback_b_team;

  let fieldUpdates: FieldUpdate[] = [];
  if (allowA != storedAllowA) {
    fieldUpdates.push(
        {
          field: 'allow_feedback_a_team',
          value: { booleanValue: allowA },
        }
    );
  }
  if (allowB != storedAllowB) {
    fieldUpdates.push(
        {
          field: 'allow_feedback_b_team',
          value: { booleanValue: allowB },
        }
    );
  }

  if (fieldUpdates.length) {
    const userAllowance = await queryUserAllowance(request.user_id);
    if (userAllowance) {
      await patchDocument(
          userAllowance?.document_name,
          [
            {
              field: 'allow_feedback_a_team',
              value: { booleanValue: allowA },
            },
            {
              field: 'allow_feedback_b_team',
              value: { booleanValue: allowB },
            },
          ],
      );
    } else {
      await createDocument(
          'user',
          {
            fields: {
              id: { stringValue: request.user_id },
              allow_feedback_a_team: { booleanValue: allowA },
              allow_feedback_b_team: { booleanValue: allowB },
            },
          },
      );
    }
  }
}
