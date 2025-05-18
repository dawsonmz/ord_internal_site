<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index.js';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { data } = $props();
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Modules</CrumbPage>
</Crumb>

<LinkCardGrid header="Module Categories" baseClasses="mx-8">
  {#each data.module_categories as moduleCategory}
    <LinkCard
        title={moduleCategory.name}
        url="/beginner-modules/{moduleCategory.short_text}"
    />
  {/each}
</LinkCardGrid>