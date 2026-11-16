<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import FootageGrid from '$lib/components/footage_grid.svelte';
  import SeasonNav from '$lib/components/season_nav.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Footage: {data.season.name} · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/footage">Footage</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.season.name}</CrumbPage>
</Crumb>

<h1 class="text-2xl font-semibold">{data.season.name}</h1>
<div class="mb-6">
  <FootageGrid footage={data.footage} />
</div>
<SeasonNav seasons={data.seasons} currentSlug={data.season.slug} baseUrl="/footage" />
