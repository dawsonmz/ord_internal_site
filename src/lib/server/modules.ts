import { sanityClient } from '$lib/util/sanity';

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
  advanced_text: [],

  // Computed fields:
  start_time: string,
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
  return await sanityClient.option.fetch(
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
        advanced_text,
      }`,
      {
        module_type: moduleType,
        query_tag: tag
      },
  );
}
