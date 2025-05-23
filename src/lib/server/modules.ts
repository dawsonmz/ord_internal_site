import imageUrlBuilder from "@sanity/image-url";
import { InternalError } from "$lib/server/errors";
import { sanityClient } from "$lib/server/sanity";

export interface ModuleCategory {
  name: String,
  description: String,
  slug: String,
};

export interface ModulesInCategory {
  category: String,
  modules: Module[],
}

export interface Module {
  name: String,
  title: String,
  category: String,
  minutes: Number,
  short_text: [],
  detailed_text: [],
  resources: ImageResource[],

  // Computed fields:
  start_time: String,
}

export interface ImageResource {
  description: String,
  image: any,
  alt: String,

  // Computed fields:
  image_url: String,
}

/**
 * @returns All module categories' names and slugs, not including the individual modules
 */
export async function loadModuleCategories(): Promise<ModuleCategory[]> {
  const moduleCategoryData: ModuleCategory[] = await sanityClient.option.fetch(
      `*[_type == "module_category"] | order(_createdAt asc) {
        name,
        description,
        "slug": slug.current,
      }`
  );
  if (moduleCategoryData) {
    return moduleCategoryData;
  } else {
    throw new InternalError("Failed to load module category data");
  }
}

const imageBuilder = imageUrlBuilder(sanityClient.option);

/**
 * @param categorySlug Slug for the category of modules being loaded, e.g. 'general-skating'
 * @returns An array of modules in the specified category
 */
export async function loadModulesInCategory(categorySlug: String): Promise<ModulesInCategory> {
  const moduleData: ModulesInCategory[] = await sanityClient.option.fetch(
      `*[_type == "module_category" && slug.current == $category] {
        "category": name,
        modules[]->,
      }`,
      { category: categorySlug },
  );

  if (!moduleData) {
    throw new InternalError("Failed to load module data.");
  } else if (moduleData.length > 1) {
    throw new InternalError("More than one module category found.");
  }

  const modulesInCategory = moduleData[0];
  if (modulesInCategory.modules) {
    modulesInCategory.modules.forEach(module => processImageResources(module));
  }
  return modulesInCategory;
}

/**
 * Updates any image resources in the provided module with sizing and the image URL.
 * @param module A modules with potentially unprocessed image resources
 */
export function processImageResources(module: Module) {
  if (module.resources) {
    module.resources.forEach(
        (imageResource: ImageResource) =>
            imageResource.image_url = imageBuilder.image(imageResource.image).width(300).url(),
    );
  }
}
