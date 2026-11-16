<script lang="ts">
  import LinkCard from '$lib/components/link_card.svelte';

  // Seasons are ordered newest first; the newest season's page is the index page itself.
  let { seasons, currentSlug, baseUrl } = $props();
</script>

{#if seasons.length}
  <h2 class="text-2xl font-semibold">All Seasons</h2>
  <div class="flex flex-wrap gap-4 sm:gap-6">
    {#each seasons as season}
      <LinkCard
          title={season.name}
          url={season.slug == seasons[0].slug ? baseUrl : `${baseUrl}/${season.slug}`}
          current={season.slug == currentSlug}
          width={180}
      />
    {/each}
  </div>
{/if}
