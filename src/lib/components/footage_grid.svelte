<script lang="ts">
  import PageLink from '$lib/components/page_link.svelte';

  let { footage } = $props();
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

<div class="flex flex-col gap-8">
  {#each footageTypes as footageType}
    {@const footageEntries = footage.get(footageType)}
    {#if footageEntries}
      <div class="flex flex-col gap-3">
        <div class="text-xl font-semibold bottom-faded-border">{footageType}</div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-x-12">
          {#each footageEntries as entry}
            <div class="flex flex-col gap-2">
              <div class="text-lg font-semibold">{entry.title}</div>
              <div class="subheading">{entry.event ?? entry.type}</div>
              <div class="subheading-light">{entry.date_text}</div>
              {#if entry.id}
                <a class="rounded-md dark:border-1 w-max"
                  href="https://youtube.com/watch?v={entry.id}{entry.start_seconds ? `&t=${entry.start_seconds}` : ''}"
                  target="_blank"
                >
                  <img class="rounded-md"
                       src="https://img.youtube.com/vi/{entry.id}/hqdefault.jpg"
                       alt="YouTube video thumbnail"
                       width="280px"
                       height="210px"
                  />
                </a>
              {:else}
                <PageLink url={entry.other_link} external width={140}>
                  {#snippet text()}
                    {getExternalLinkText(entry.other_link)}
                  {/snippet}
                </PageLink>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/each}
</div>
