<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import SeasonNav from '$lib/components/season_nav.svelte';
  import TrainingPlanGrid from '$lib/components/training_plan_grid.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Beginner Plans: {data.season.name} · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.season.name}</CrumbPage>
</Crumb>

<h1 class="text-2xl font-semibold">{data.season.name}</h1>
<div class="mb-6">
  <TrainingPlanGrid season={data.season} />
</div>
<SeasonNav seasons={data.seasons} currentSlug={data.season.slug} baseUrl="/beginner-plans" />
