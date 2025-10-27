<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { data } = $props();
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Modules</CrumbPage>
</Crumb>

<p>
  Individual drills used to assemble beginners training plans.
</p>
<LinkCardGrid header="Categories">
  {#each data.module_categories as moduleCategory}
    <LinkCard
        title={moduleCategory.name}
        description={moduleCategory.description.valueOf()}
        url="/beginner-modules/{moduleCategory.slug}"
    />
  {/each}
</LinkCardGrid>
