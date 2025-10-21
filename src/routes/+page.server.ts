import type { Actions } from './$types';
import { submitFeedback } from '$lib/server/feedback';

export const actions = { feedback: submitFeedback } satisfies Actions;
