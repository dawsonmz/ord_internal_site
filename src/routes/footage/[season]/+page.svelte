<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import PageLink from '$lib/components/page_link.svelte';

  let { data } = $props();
  const footageTypes = [
    'A Team',
    'B Team',
    'Scrimmage',
    'Team Norway',
  ];

  function getExternalLinkText(link: string) {
    if (link.includes('twitch.tv')) {
      return 'Twitch VOD';
    } else {
      return 'Unrecognized Link Type';
    }
  }
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/footage">Footage</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.season.name}</CrumbPage>
</Crumb>

<div class="flex flex-wrap gap-12 sm:gap-16">
  {#each footageTypes as footageType}
    {#if data.footage.has(footageType)}
      <div class="flex flex-col gap-5">
        <div class="text-2xl font-semibold">{footageType}</div>
        {#each data.footage.get(footageType) as footage}
          <div class="flex flex-col gap-2">
            <div class="text-lg font-semibold">{footage.title}</div>
            <div class="subheading">{footage.event ?? footage.type}</div>
            <div class="subheading-light">{footage.date_text}</div>
            {#if footage.id}
              <a class="rounded-md dark:border-1 w-max"
                href="https://youtube.com/watch?v={footage.id}{footage.start_seconds ? `&amp;start=${footage.start_seconds}` : ''}"
                target="_blank"
              >
                <img class="rounded-md"
                     src="https://img.youtube.com/vi/{footage.id}/hqdefault.jpg"
                     alt="YouTube video thumbnail"
                     width="240px"
                     height="180px"
                />
              </a>
            {:else}
              <PageLink url={footage.other_link} external width={140}>
                {#snippet text()}
                  {getExternalLinkText(footage.other_link!)}
                {/snippet}
              </PageLink>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  {/each}
</div>
