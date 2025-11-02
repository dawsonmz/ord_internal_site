<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import LinkCard from '$lib/components/link_card.svelte';

  let { data } = $props();
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Footage</CrumbPage>
</Crumb>

{#each data.years as year}
  <div class="text-xl font-semibold">{year}</div>
  <div class="flex gap-6">
    {#each data.seasons.get(year) as season}
      <LinkCard title={season.name} url="/footage/{season.slug}" width={180} />
    {/each}
  </div>
{/each}
