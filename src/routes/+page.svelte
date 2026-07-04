<script lang="ts">
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';
  import { navGroups } from '$lib/nav';

  let { data } = $props();
  const linkWidth = 190;
</script>

<div class="sm:self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-fit sm:gap-x-16 md:gap-x-32 gap-y-8">
  <div class="text-2xl font-semibold sm:col-span-2 md:col-span-3 text-center">
    Oslo Roller Derby Internal Site
  </div>
  {#each navGroups as group (group.header)}
    <PageLinkGroup header={group.header}>
      {#each group.links as link (link.url)}
        <PageLink url={link.url} external={link.external ?? false} width={linkWidth}>
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

  <div class="sm:col-span-2 md:col-span-3">
    <div class="text-xl font-semibold mb-2">Website Updates</div>
    <div class="subheading mb-2">Latest update post: {data.latest_update_date}</div>
    <PageLink url="/updates">
      {#snippet text()}
        Read about changes to the website here!
      {/snippet}
    </PageLink>
  </div>
</div>
