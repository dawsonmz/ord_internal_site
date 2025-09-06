import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback_actions";
import { loadModuleCategories } from "$lib/server/modules";

export async function load() {
  return {
    module_categories: await loadModuleCategories(),
  };
}

export const actions = {
  feedback: async ({ request }) => {
    return await submitFeedback(await request.formData());
  },
} satisfies Actions;

