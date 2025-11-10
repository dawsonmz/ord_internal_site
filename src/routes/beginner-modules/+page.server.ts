import type { Actions } from './$types';
import { loadModules, loadModuleTags } from '$lib/server/modules';
import { submitSiteFeedback } from '$lib/server/site_feedback';

export async function load({ url }) {
  const tagParam = url.searchParams.get('tag')?.toLowerCase();
  const [ moduleTags, modules ] = await Promise.all([
    loadModuleTags('beginners'),
    loadModules('beginners', tagParam),
  ]);

  return {
    module_tags: moduleTags,
    filter_tag: moduleTags.length ? moduleTags.find(tag => tag.slug == tagParam) : null,
    modules,
  };
}

export const actions = { sitefeedback: submitSiteFeedback } satisfies Actions;
