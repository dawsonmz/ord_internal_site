import type { Actions } from './$types';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;
