import imageUrlBuilder from "@sanity/image-url";
import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface Module {
  _id: String,
  _createdAt: String,
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

export interface ModuleRef {
  _ref: String,
}

const imageBuilder = imageUrlBuilder(sanityClientCredentials.option);

export async function loadModules(): Promise<Module[]> {
  return loadModulesWithQuery(`*[_type == "module"] | order(_createdAt asc)`);
}

export async function loadModulesInCategory(category: String): Promise<Module[]> {
  return loadModulesWithQuery(
      `*[_type == "module" && lower(category) == $category] | order(_createdAt asc)`,
      { category: category.toLowerCase().replaceAll('-', ' ') },
  );
}

async function loadModulesWithQuery(query: string, params?: any): Promise<Module[]> {
  const moduleData = await sanityClientCredentials.option.fetch(query, params);
  if (!moduleData) {
    throw new InternalError("Failed to load module data.");
  }

  moduleData.forEach(
      (module: Module) => {
        if (module.resources) {
          module.resources.forEach(
              (imageResource: ImageResource) => {
                imageResource.image_url = imageBuilder.image(imageResource.image).width(300).url();
              },
          );
        }
      },
  );
  return moduleData;
}
