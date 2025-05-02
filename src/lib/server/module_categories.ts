import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface ModuleCategory {
  _id: String,
  name: String,
  description: String,

  // Computed fields:
  short_text: String,
}

export interface ModuleCategoryRef {
  _ref: String,
}

/**
 * @returns All module categories, sorted in increasing order by creation time.
 */
export async function loadModuleCategories(): Promise<ModuleCategory[]> {
  const moduleCategoryData: ModuleCategory[] = await sanityClientCredentials.option.fetch(`*[_type == "module_category"] | order(_createdAt asc)`);
  if (moduleCategoryData) {
    moduleCategoryData.forEach(
        (moduleCategory: ModuleCategory) => {
          moduleCategory.short_text = moduleCategory.name.toLowerCase().replaceAll(' ', '-');
        }
    );
    return moduleCategoryData;
  } else {
    throw new InternalError("Failed to load module category data");
  }
}
