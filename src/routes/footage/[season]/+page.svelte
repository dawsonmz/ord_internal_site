<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import FootageGrid from '$lib/components/footage_grid.svelte';
  import SeasonNav from '$lib/components/season_nav.svelte';

  let { data } = $props();
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/footage">Footage</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.season.name}</CrumbPage>
</Crumb>

<div class="text-2xl font-semibold">{data.season.name}</div>
<div class="mb-6">
  <FootageGrid footage={data.footage} />
</div>
<SeasonNav seasons={data.seasons} currentSlug={data.season.slug} baseUrl="/footage" />
