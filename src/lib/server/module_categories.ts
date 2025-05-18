import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface ModuleCategory {
  name: String,
  short_text: String,
};

/**
 * @returns All module categories
 */
export async function loadModuleCategories(): Promise<ModuleCategory[]> {
  const moduleCategoriesData: { categories: String[] }[] = await sanityClientCredentials.option.fetch(`*[_type == "module_categories"]`);
  if (moduleCategoriesData) {
    return moduleCategoriesData[0].categories.map(
        (category) => {
          return {
            name: category,
            short_text: category.toLowerCase().replaceAll(' ', '-'),
          };
        },
    );
  } else {
    throw new InternalError("Failed to load module category data");
  }
}
