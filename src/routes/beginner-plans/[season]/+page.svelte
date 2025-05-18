<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index.js';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { data } = $props();
  const season = data.season!;
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{season.season}</CrumbPage>
</Crumb>

<div class="mx-8">
  {#if season.training_plans?.length}
    <LinkCardGrid header={season.season.valueOf()}>
      {#each season.training_plans as trainingPlanSummary}
        <LinkCard
            title="Training {trainingPlanSummary.training_label}"
            subtitle={trainingPlanSummary.date_text.valueOf()}
            description={trainingPlanSummary.summary.valueOf()}
            url="/beginner-plans/{season.season_slug}/{trainingPlanSummary.training_label}"
        />
      {/each}
    </LinkCardGrid>
  {:else}
    No training plans found.
  {/if}
</div>
