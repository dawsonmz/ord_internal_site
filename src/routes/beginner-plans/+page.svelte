<script lang="ts">
  import { page } from '$app/state';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { data } = $props();
  const showHidden = page.url.searchParams.get('show-hidden')?.trim().toLowerCase() === 'true';
</script>

<Crumb baseClasses="ml-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Plans</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 ml-8">
  <p>
    Current and previous training plans for the ORD beginners course.
  </p>
  {#each data.seasons as season}
    <LinkCardGrid header={season.name.valueOf()} anchor={season.slug.valueOf()}>
      {#each season.training_plans as plan}
        <LinkCard
            title="Training {plan.training_label}"
            subtitle={plan.date_text.valueOf()}
            description={plan.summary.valueOf()}
            url="/beginner-plans/{season.slug}-{plan.slug}{showHidden ? '?show-hidden=true' : ''}"
            hiddenTag={!plan.visible}
        />
      {/each}
    </LinkCardGrid>
  {/each}
</div>
