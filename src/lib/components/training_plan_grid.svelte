<script lang="ts">
  import LinkCard from '$lib/components/link_card.svelte';

  let { season, urlSuffix='' } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
  {#each season.training_plans as plan}
    <LinkCard
        title="Training {plan.training_label}"
        subtitle={plan.date_text}
        description={plan.summary}
        url="/beginner-plans/{season.slug}/{plan.slug}{urlSuffix}"
        hiddenTag={!plan.visible}
        width={300}
    />
  {/each}
</div>
