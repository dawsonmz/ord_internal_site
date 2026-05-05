import type { Actions } from './$types';
import { checkAuthenticated } from '$lib/server/roles';
import { loadModules, loadModuleTags } from '$lib/server/modules';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ locals, url }) {
  checkAuthenticated(locals);
  const tagParam = url.searchParams.get('tag')?.toLowerCase();
  const mainTagParam = url.searchParams.get('main_tag')?.toLowerCase();
  const effectiveTag = mainTagParam || tagParam;
  const [ moduleTags, modules ] = await Promise.all(
      [
        loadModuleTags('beginners'),
        loadModules('beginners', { tag: tagParam, mainTag: mainTagParam }),
      ]
  );

  return {
    module_tags: moduleTags,
    filter_tag: effectiveTag ? moduleTags.find(tag => tag.slug == effectiveTag) ?? null : null,
    main_tag_only: !!mainTagParam,
    modules,
  };
}

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;
