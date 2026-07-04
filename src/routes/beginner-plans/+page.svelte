<script lang="ts">
  import { page } from '$app/state';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import SeasonNav from '$lib/components/season_nav.svelte';
  import TrainingPlanGrid from '$lib/components/training_plan_grid.svelte';

  let { data } = $props();
  const showHidden = $derived(page.url.searchParams.get('show-hidden')?.trim().toLowerCase() == 'true');
  const hiddenQuery = $derived(showHidden ? '?show-hidden=true' : '');
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Plans</CrumbPage>
</Crumb>

<p>
  Current and previous training plans for the beginners course.
</p>
{#if data.season}
  <div class="text-2xl font-semibold">{data.season.name}</div>
  <div class="mb-6">
    <TrainingPlanGrid season={data.season} urlSuffix={hiddenQuery} />
  </div>
  <SeasonNav seasons={data.seasons} currentSlug={data.season.slug} baseUrl="/beginner-plans" urlSuffix={hiddenQuery} />
{/if}
