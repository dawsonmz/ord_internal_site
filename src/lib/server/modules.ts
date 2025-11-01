import { getSanityImageUrl, sanityClient } from '$lib/util/sanity';

export interface ModuleTag {
  name: string,
  slug: string,
  color: string,
}

export interface Module {
  type: string,
  title: string,
  main_tag: ModuleTag,
  tags: ModuleTag[],
  minutes: number,
  short_text: [],
  detailed_text: [],
  resources: ImageResource[],

  // Computed fields:
  start_time: string,
}

export interface ImageResource {
  description: string,
  image: any,
  alt: string,

  // Computed fields:
  image_url: string,
}

export async function loadModuleTags(moduleType: string): Promise<ModuleTag[]> {
  return await sanityClient.option.fetch(
      `*[_type == "module_tag" && module_type == $module_type && slug.current != "routine"] | order(orderRank asc) {
        name,
        "slug": slug.current,
      }`,
      { module_type: moduleType },
  );
}

export async function loadModules(moduleType: string, tag: string | undefined): Promise<Module[]> {
  const tagFilter = tag ? '&& (main_tag->slug.current == $query_tag || $query_tag in additional_tags[]->slug.current)' : '';
  const moduleData: Module[] = await sanityClient.option.fetch(
      `*[_type == "module" && type == $module_type && main_tag->slug.current != "routine" ${tagFilter}]
          | order(main_tag->orderRank asc, orderRank asc) {
        type,
        title,
        "tags": [
          main_tag-> {
            name,
            "slug": slug.current,
            color,
          },
          ...additional_tags[]-> {
            name,
            "slug": slug.current,
            color,
          },
        ],
        minutes,
        short_text,
        detailed_text,
        resources,
      }`,
      {
        module_type: moduleType,
        query_tag: tag
      },
  );
  
  moduleData.forEach(module => processImages(module));
  return moduleData;
}

/**
 * Updates any image resources in the provided module with sizing and the image URL.
 * @param module A modules with potentially unprocessed image resources
 */
export function processImages(module: Module) {
  if (module.resources) {
    module.resources.forEach(
        (imageResource: ImageResource) => imageResource.image_url = getSanityImageUrl(imageResource.image, 300)
    );
  }
}
