<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index.js';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { data } = $props();
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Plans</CrumbPage>
</Crumb>

<div class="mx-8">
  <LinkCardGrid header="Seasons">
    {#each data.seasons as season}
      <LinkCard
          title={season.name}
          description="{season.num_trainings} {season.num_trainings == 1 ? 'training' : 'trainings'}"
          url="/beginner-plans/{season.slug}"
      />
    {/each}
  </LinkCardGrid>
</div>
