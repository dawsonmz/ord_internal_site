import { type ModuleTag } from '$lib/server/modules';;
import { sanityClient } from '$lib/util/sanity';

export interface RequiredSkill {
  // General fields
  stage: string,
  title: string,
  slug: string,
  importance: string,
  key_points: string[],
  module_tag: ModuleTag,

  // User-specific fields
}

export async function loadRequiredSkills(): Promise<RequiredSkill[]> {
  const requiredSkills = await sanityClient.option.fetch(
      `*[_type == "required_skill"] | order(orderRank asc) {
        stage,
        title,
        "slug": slug.current,
        importance,
        key_points,
        "module_tag": module_tag-> {
          name,
          "slug": slug.current,
          color,
        },
      }`
  );

  return requiredSkills;
}
