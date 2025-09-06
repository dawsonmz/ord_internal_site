import type { Actions } from "./$types";
import { submitFeedback } from "$lib/server/feedback_actions";
import { loadModulesInCategory } from "$lib/server/modules";

export async function load({ params }) {
  const modules = await loadModulesInCategory(params.category);
  if (modules) {
    return modules;
  }

  return {
    status: 404,
    body: "No modules in the specified category were found",
  };
}

export const actions = {
  feedback: async ({ request }) => {
    return await submitFeedback(await request.formData());
  },
} satisfies Actions;
