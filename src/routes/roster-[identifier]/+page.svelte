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

<div class="flex flex-col gap-6 sm:gap-8">
  <div class="flex flex-col sm:flex-row gap-6 sm:gap-8">
    <SkaterNumberGroup heading={roster.line_a_name} skaterNumbers={roster.line_a} />
    <SkaterNumberGroup heading={roster.line_b_name} skaterNumbers={roster.line_b} />
  </div>
  <div class="flex flex-col sm:flex-row gap-6 sm:gap-8">
    {#if roster.jammers}
      <SkaterNumberGroup heading="Jammers" skaterNumbers={roster.jammers} />
    {/if}
    {#if roster.bench}
      <SkaterNumberGroup heading="Bench" skaterNumbers={roster.bench} />
    {/if}
  </div>
</div>
