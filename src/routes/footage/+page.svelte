<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';

  let { data } = $props();
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Footage</CrumbPage>
</Crumb>

<PageLinkGroup header="Choose a season" width={200}>
  <div class="mx-2">
    {#each data.seasons as season}
      <PageLink url="/footage/{season.slug}" width={160}>
        {#snippet text()}
          {season.name}
        {/snippet}
      </PageLink>
    {/each}
  </div>
</PageLinkGroup>
