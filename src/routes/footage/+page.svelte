<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import FootageGrid from '$lib/components/footage_grid.svelte';
  import SeasonNav from '$lib/components/season_nav.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Footage · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Footage</CrumbPage>
</Crumb>

{#if data.seasons.length}
  <h1 class="text-2xl font-semibold">{data.seasons[0].name}</h1>
  <div class="mb-6">
    <FootageGrid footage={data.footage} />
  </div>
  <SeasonNav seasons={data.seasons} currentSlug={data.seasons[0].slug} baseUrl="/footage" />
{/if}
