<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import SkaterNumberGroup from '$lib/components/skater_number_group.svelte';

  let { data } = $props();
  const roster = $derived(data.roster);
</script>

<svelte:head>
  <title>{roster.short_name} Roster · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>{roster.short_name}</CrumbPage>
</Crumb>

<h1 class="text-2xl font-semibold">{roster.name}</h1>
<div class="text-lg subheading">{roster.season}</div>

<div class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-8">
  <SkaterNumberGroup heading={roster.line_a_name} skaterNumbers={roster.line_a} />
  <SkaterNumberGroup heading={roster.line_b_name} skaterNumbers={roster.line_b} />
  <SkaterNumberGroup heading="Jammers" skaterNumbers={roster.jammers} />
  <SkaterNumberGroup heading="Bench" skaterNumbers={roster.bench} />
</div>
