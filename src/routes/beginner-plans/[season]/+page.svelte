<script lang="ts">
  import { page } from '$app/state';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import SeasonNav from '$lib/components/season_nav.svelte';
  import TrainingPlanGrid from '$lib/components/training_plan_grid.svelte';

  let { data } = $props();
  const showHidden = $derived(page.url.searchParams.get('show-hidden')?.trim().toLowerCase() == 'true');
  const hiddenQuery = $derived(showHidden ? '?show-hidden=true' : '');
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans{hiddenQuery}">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.season.name}</CrumbPage>
</Crumb>

<div class="text-2xl font-semibold">{data.season.name}</div>
<div class="mb-6">
  <TrainingPlanGrid season={data.season} urlSuffix={hiddenQuery} />
</div>
<SeasonNav seasons={data.seasons} currentSlug={data.season.slug} baseUrl="/beginner-plans" urlSuffix={hiddenQuery} />
