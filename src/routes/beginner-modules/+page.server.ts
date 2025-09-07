import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback";
import { loadModuleCategories } from "$lib/server/modules";

export async function load() {
  return {
    module_categories: await loadModuleCategories(),
  };
}

export const actions = { feedback: submitFeedback } satisfies Actions;

