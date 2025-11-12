import type { Actions } from './$types';
import { getLatestPostDate } from '$lib/server/posts';
import { submitSiteFeedback } from '$lib/server/site_feedback';
import { formatDateTextWithYear } from '$lib/util/datetime';

export async function load() {
  const latestUpdateDate = await getLatestPostDate('Update');
  return {
    latest_update_date: latestUpdateDate ? formatDateTextWithYear(latestUpdateDate) : '(none)',
  };
}

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;
