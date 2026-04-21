import { error } from '@sveltejs/kit';

export function dropUserIdPrefix(userId: string) {
  if (!userId.startsWith('user_')) {
    error(500, `userId missing user_ prefix: ${userId}`);
  }
  return userId.substring(5);
}

export function addUserIdPrefix(userId: string) {
  if (userId.startsWith('user_')) {
    error(500, `userId has unexpected user_ prefix: ${userId}`);
  }
  return `user_${userId}`;
}
