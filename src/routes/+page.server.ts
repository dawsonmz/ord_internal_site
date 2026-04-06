import { getLatestPostDate } from '$lib/server/posts';
import { formatDateTextWithYear } from '$lib/util/datetime';

export async function load() {
  const latestUpdateDate = await getLatestPostDate('Update');
  return {
    latest_update_date: latestUpdateDate ? formatDateTextWithYear(latestUpdateDate) : '(none)',
  };
}
