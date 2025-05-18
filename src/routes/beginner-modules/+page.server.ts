import { loadModuleCategories } from "$lib/server/modules";

export async function load() {
  return {
    module_categories: await loadModuleCategories(),
  };
}
