import { error } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';
import { type FieldUpdate, getDocument, getDocuments, patchDocument } from '$lib/server/firestore';

export interface User {
  user_id: string,
  name: string,
  roles: Role[],
}

export interface UserAllowance {
  user_id: string,
  allow_feedback_a_team: boolean,
  allow_feedback_b_team: boolean,
}

export interface UserAllowanceRequest {
  user_id: string,
  user_name: string,
  allow_feedback_a_team: boolean,
  allow_feedback_b_team: boolean,
  stored_allow_feedback_a_team: boolean,
  stored_allow_feedback_b_team: boolean,
}

// === Clerk functionality ===

export async function getUser(userId: string): Promise<User> {
  try {
    const user = await clerkClient.users.getUser(userId);
    return {
      user_id: userId,
      name: user.fullName!,
      roles: user.publicMetadata?.roles ?? [],
    };
  } catch (err: any) {
    if (err.status == 404) {
      error(404, 'User not found');
    } else {
      error(500, 'Internal server error');
    }
  }
}

export async function getAllUsers(): Promise<User[]> {
  let users: User[] = [];
  let count: number;
  let offset = 0;
  do {
    const userPage = await clerkClient.users.getUserList({ limit: 100, offset });
    count = userPage.data.length;
    offset += 100;
    users.push(
        ...userPage.data
            .map(
                user => {
                  return {
                    user_id: user.id,
                    name: user.fullName!,
                    roles: user.publicMetadata.roles ?? [],
                  };
                }
            )
    );
  } while (count >= 100);

  return users;
}

// === Feedback functionality ===

export async function getUserAllowances(): Promise<UserAllowance[]> {
  const results = await getDocuments([], 'user');
  return results.map(
      (document: any) => {
        return {
          user_id: document.name.split('/').at(-1),
          allow_feedback_a_team: document.fields.allow_feedback_a_team?.booleanValue ?? false,
          allow_feedback_b_team: document.fields.allow_feedback_b_team?.booleanValue ?? false,
        };
      },
  );
}

export async function getUserAllowance(userId: string): Promise<UserAllowance | null> {
  const document = await getDocument([{ collection: 'user', document_id: userId }]);
  if (!document) {
    return null;
  }
  return {
    user_id: userId,
    allow_feedback_a_team: document.fields.allow_feedback_a_team?.booleanValue ?? false,
    allow_feedback_b_team: document.fields.allow_feedback_b_team?.booleanValue ?? false,
  };
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
    await patchDocument(
        [{ collection: 'user', document_id: request.user_id }],
        [
          {
            field: 'user_name',
            value: { stringValue: request.user_name },
          },
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
  }
}
