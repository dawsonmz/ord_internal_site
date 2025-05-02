import { loadModuleCategories } from "$lib/server/module_categories";

export async function load() {
  return {
    module_categories: await loadModuleCategories(),
  };
}
