<script lang="ts">
  import { ChevronDown, ChevronUp } from '@lucide/svelte/icons';
  import { Accordion } from '@skeletonlabs/skeleton-svelte';

  let { header, openNavItems, children } = $props();
</script>

<Accordion.Item value={header} class="mb-4">
  <Accordion.ItemTrigger
      class="flex
             items-center
             justify-between
             w-full
             link-hover
             mb-2
             mr-2
             {openNavItems.includes(header) ? 'bg-[var(--semi-dark-color)]' : ''}"
  >
    <div class="text-lg font-semibold">{header}</div>
    {#if openNavItems.includes(header)}
      <ChevronUp />
    {:else}
      <ChevronDown />
    {/if}
  </Accordion.ItemTrigger>
  <Accordion.ItemContent class="flex flex-col gap-3">
    {@render children()}
  </Accordion.ItemContent>
</Accordion.Item>
