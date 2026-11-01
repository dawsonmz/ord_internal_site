<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';

  let { data } = $props();
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Document Links</CrumbPage>
</Crumb>

<div class="sm:self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-fit sm:gap-x-16 md:gap-x-32 gap-y-6">
  {#each data.link_groups as group (group.header)}
    <PageLinkGroup header={group.header}>
      {#each group.links as link (link.url)}
        <PageLink url={link.url} external={true} width={250}>
          {#snippet text()}
            {link.label}
          {/snippet}
          {#snippet description()}
            {link.description}
          {/snippet}
        </PageLink>
      {/each}
    </PageLinkGroup>
  {/each}
</div>
