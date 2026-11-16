<script lang="ts">
  import logo from '$lib/assets/ord-logo.png';
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';
  import { navGroups } from '$lib/nav';

  let { data } = $props();
  const linkWidth = 190;
</script>

<svelte:head>
  <title>Home · Oslo Roller Derby</title>
</svelte:head>

<h1 class="self-center -mt-2 sm:mt-0 sm:mb-4">
  <img class="size-30 sm:size-36 object-contain" src={logo} alt="Oslo Roller Derby" />
</h1>
<div class="sm:self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-fit sm:gap-x-16 md:gap-x-32 gap-y-8">
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
    <h2 class="text-xl font-semibold mb-2">Website Updates</h2>
    <div class="subheading mb-2">Latest: {data.latest_update_date}</div>
    <PageLink url="/updates">
      {#snippet text()}
        Read about changes to the website here!
      {/snippet}
    </PageLink>
  </div>
</div>
