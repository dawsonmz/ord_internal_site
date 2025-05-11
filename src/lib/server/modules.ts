import imageUrlBuilder from "@sanity/image-url";
import { InternalError } from "$lib/server/errors";
import { type ModuleCategory, type ModuleCategoryRef, loadModuleCategories } from "$lib/server/module_categories";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface Module {
  _id: String,
  _createdAt: String,
  name: String,
  title: String,
  category: ModuleCategoryRef,
  minutes: Number,
  short_text: [],
  detailed_text: [],
  resources: ImageResource[],

  // Computed fields:
  module_category: ModuleCategory,
  start_time: String,
}

export interface ImageResource {
  description: String,
  image: any,
  alt: String,

  // Computed fields:
  image_url: String,
}

export interface ModuleRef {
  _ref: String,
}

const imageBuilder = imageUrlBuilder(sanityClientCredentials.option);

export async function loadModules(): Promise<Module[]> {
  const [moduleCategoryData, moduleData] = await Promise.all(
      [
        loadModuleCategories(),
        await sanityClientCredentials.option.fetch(`*[_type == "module"] | order(_createdAt asc)`),
      ]
  );
  if (!moduleCategoryData || !moduleData) {
    throw new InternalError("Failed to load module data.");
  }

  const moduleCategoriesById = new Map<String, ModuleCategory>();
  moduleCategoryData.forEach(
      (moduleCategory: ModuleCategory) => {
        moduleCategoriesById.set(moduleCategory._id, moduleCategory);
      }
  );

  moduleData.forEach(
      (module: Module) => {
        module.module_category = moduleCategoriesById.get(module.category._ref)!;
        if (module.resources) {
          module.resources.forEach(
              (imageResource: ImageResource) => {
                imageResource.image_url = imageBuilder.image(imageResource.image).height(300).url();
              }
          );
        }
      }
  );
  return moduleData;
}
