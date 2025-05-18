import { loadModulesInCategory } from "$lib/server/modules";

export async function load({ params }) {
  const modules = await loadModulesInCategory(params.category);
  if (modules.length) {
    return { modules };
  }

  return {
    status: 404,
    body: "No modules in the specified category were found",
  };
}
