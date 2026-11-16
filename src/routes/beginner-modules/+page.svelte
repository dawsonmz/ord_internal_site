<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/state';
  import { ChevronDown, ChevronUp, Minus, Plus, X } from '@lucide/svelte/icons';
  import { Accordion } from '@skeletonlabs/skeleton-svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import Module from '$lib/components/module.svelte';
  import ModuleHeader from '$lib/components/module_header.svelte';

  let { data, form } = $props();

  let tagParam = $derived(
      (page.url.searchParams.get('main_tag') || page.url.searchParams.get('tag'))?.trim().toLowerCase() ?? ''
  );

  let openItems: string[] = $state([]);
  let tabStates = $derived(new Array<string>(data.modules.length).fill('Short'));

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
<div class="flex gap-2">
  <select
      id="tag-filter"
      bind:value={tagParam}
      class="input min-w-0 text-sm bg-white dark:bg-(--dark-color) py-2"
      onchange={
        e => {
          const tag = e.currentTarget.value;
          goto(`${page.url.pathname}${tag ? `?tag=${tag}` : ''}`, { keepFocus: true, noScroll: true });
        }
      }
  >
    <option value="">-- Filter by tag --</option>
    {#each data.module_tags as moduleTag}
      <option value={moduleTag.slug}>
        {moduleTag.name}
      </option>
    {/each}
  </select>
  <button
      type="button"
      class="flex justify-center items-center w-10 shrink-0 button-secondary"
      title="Clear filter"
      disabled={!tagParam}
      onclick={() => goto(page.url.pathname, { noScroll: true })}
  >
    <X size={20} />
    <span class="sr-only">Clear filter</span>
  </button>
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
  <button type="button" class="flex justify-center items-center gap-2 w-40 text-sm p-2 button-secondary" onclick={openAllModules}>
    <Plus size={20} />
    <div class="mr-2">Expand All</div>
  </button>
  <button type="button" class="flex justify-center items-center gap-2 w-40 text-sm p-2 button-secondary" onclick={closeAllModules}>
    <Minus size={20} />
    <div class="mr-2">Collapse All</div>
  </button>
</div>

<Accordion value={openItems} multiple onValueChange={e => openItems = e.value}>
  {#each data.modules as module, index}
    <Accordion.Item
        value={`${index}`}
        class="border
               border-(--faded-dark-color)
               dark:border-(--very-light-color)
               rounded-sm
               shadow-md
               p-2
               sm:p-3
               mb-3
               sm:mb-4"
    >
      <Accordion.ItemTrigger class="w-full transition-colors duration-150 strong-hover">
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
