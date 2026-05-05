<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import { ChevronDown, ChevronUp, Minus, Plus } from '@lucide/svelte/icons';
  import { Accordion } from '@skeletonlabs/skeleton-svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import Module from '$lib/components/module.svelte';
  import ModuleHeader from '$lib/components/module_header.svelte';

  let { data, form } = $props();

  let tagParam = $derived(page.url.searchParams.get('tag')?.trim().toLowerCase() ?? '');
  let filterUrl = $derived(`${page.url.pathname}${tagParam ? `?tag=${tagParam}` : ''}`);

  let openItems: string[] = $state([]);
  let tabStates = $state(new Array<string>(data.modules.length).fill('Short'));

  function openAllModules() {
    openItems = [];
    for (let index = 0; index < data.modules.length; index++) {
      openItems.push(`${index}`);
    }
  }

  function closeAllModules() {
    openItems = [];
  }

  afterNavigate(() => closeAllModules());
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Modules</CrumbPage>
</Crumb>

<div>
  These are the individual modules used to assemble beginners training plans.
</div>
<select id="tag-filter" bind:value={tagParam} class="input sm:w-[420px] md:w-[700px] text-sm bg-white dark:bg-[var(--dark-color)]">
  <option value="">-- Filter by tag --</option>
  {#each data.module_tags as moduleTag}
    <option value={moduleTag.slug}>
      {moduleTag.name}
    </option>
  {/each}
</select>
<div class="flex gap-2">
  <a class="flex justify-center button-style text-sm w-[160px] p-2" href={filterUrl}>Apply Filter</a>
  <a class="flex justify-center button-style text-sm w-[160px] p-2" href={page.url.pathname}>Clear Filter</a>
</div>

<div class="text-lg mt-4">
  {#if data.filter_tag && data.main_tag_only}
    Modules primarily focused on: <span class="font-semibold">{data.filter_tag.name}</span>
  {:else if data.filter_tag}
    Modules tagged: <span class="font-semibold">{data.filter_tag.name}</span>
  {:else}
    All Beginner Modules
  {/if}
</div>
<div class="flex gap-2 mb-2">
  <button type="button" class="flex justify-center items-center gap-2 w-[160px] text-sm p-2 button-style" onclick={openAllModules}>
    <Plus size={20} />
    <div class="mr-2">Expand All</div>
  </button>
  <button type="button" class="flex justify-center items-center gap-2 w-[160px] text-sm p-2 button-style" onclick={closeAllModules}>
    <Minus size={20} />
    <div class="mr-2">Collapse All</div>
  </button>
</div>

<Accordion value={openItems} multiple onValueChange={e => openItems = e.value}>
  {#each data.modules as module, index}
    <Accordion.Item
        value={`${index}`}
        class="border-1
               border-(--faded-dark-color)
               dark:border-(--very-light-color)
               rounded-sm
               shadow-md
               sm:w-[420px]
               md:w-[700px]
               p-2
               sm:p-3
               mb-3
               sm:mb-4"
    >
      <Accordion.ItemTrigger class="w-full sm:w-[400px] md:w-[680px] transition-colors duration-150 strong-hover">
        <ModuleHeader {module}>
          {#snippet trailing()}
            <div class="px-1 sm:px-2">
              {#if openItems.includes(`${index}`)}
                <ChevronUp />
              {:else}
                <ChevronDown />
              {/if}
            </div>
          {/snippet}
        </ModuleHeader>
      </Accordion.ItemTrigger>
      
      <Accordion.ItemContent class="mx-1 mt-4">
        <Module module={module} {tabStates} {index} {form} />
      </Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion>
