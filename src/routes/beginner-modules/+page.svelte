<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { data } = $props();
</script>

<Crumb baseClasses="ml-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Modules</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 ml-8">
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
</div>
