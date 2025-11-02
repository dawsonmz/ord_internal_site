<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import SkaterNumberGroup from '$lib/components/skater_number_group.svelte';

  let { data } = $props();
  const roster = $derived(data.roster);
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>{roster.short_name}</CrumbPage>
</Crumb>

<div class="text-xl font-semibold">{roster.name}</div>
<div class="text-lg subheading">{roster.season}</div>

<div class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-8">
  <SkaterNumberGroup heading={roster.line_a_name} skaterNumbers={roster.line_a} />
  <SkaterNumberGroup heading={roster.line_b_name} skaterNumbers={roster.line_b} />
  <SkaterNumberGroup heading="Jammers" skaterNumbers={roster.jammers} />
  <SkaterNumberGroup heading="Bench" skaterNumbers={roster.bench} />
</div>
