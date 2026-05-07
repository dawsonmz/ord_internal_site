import { error } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';
import { type FieldUpdate, getDocument, getDocuments, patchDocument } from '$lib/server/firestore';

const USERS_CACHE_KEY = 'users:all';
const USERS_CACHE_TTL_SECONDS = 21 * 60 * 60;

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

export function usersCache(platform: Readonly<App.Platform> | undefined): KVNamespace {
  const cache = platform?.env.USERS_CACHE;
  if (!cache) {
    error(500, 'USERS_CACHE binding is not available');
  }
  return cache;
}

// === Clerk functionality ===

export async function getUser(userId: string, cache: KVNamespace): Promise<User> {
  const cachedUsers = await readCachedUsers(cache);
  const cachedUser = cachedUsers?.find(user => user.user_id == userId);
  if (cachedUser) {
    return cachedUser;
  }

  // Fall back to a direct Clerk lookup when the user isn't in the cached list. This covers cold
  // caches, freshly created users not yet reflected in cache, and is the path that surfaces a
  // genuine 404 for non-existent users.
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

export async function getAllUsers(cache: KVNamespace): Promise<User[]> {
  const cachedUsers = await readCachedUsers(cache);
  if (cachedUsers) {
    return cachedUsers;
  }

  const users = await fetchAllUsersFromClerk();
  await cache.put(
      USERS_CACHE_KEY,
      JSON.stringify(users),
      { expirationTtl: USERS_CACHE_TTL_SECONDS },
  );
  return users;
}

async function readCachedUsers(cache: KVNamespace): Promise<User[] | null> {
  return await cache.get<User[]>(USERS_CACHE_KEY, 'json');
}

async function fetchAllUsersFromClerk(): Promise<User[]> {
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
