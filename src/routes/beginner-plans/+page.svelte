<script lang="ts">
  import { page } from '$app/state';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import LinkCard from '$lib/components/link_card.svelte';

  let { data } = $props();
  const showHidden = $derived(page.url.searchParams.get('show-hidden')?.trim().toLowerCase() === 'true');
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Beginner Plans</CrumbPage>
</Crumb>

<p>
  Current and previous training plans for the beginners course.
</p>
{#each data.seasons as season}
  <div id={season.slug} class="text-xl font-semibold">{season.name}</div>
  <div class="self-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {#each season.training_plans as plan}
      <LinkCard
          title="Training {plan.training_label}"
          subtitle={plan.date_text}
          description={plan.summary}
          url="/beginner-plans/{season.slug}-{plan.slug}{showHidden ? '?show-hidden=true' : ''}"
          hiddenTag={!plan.visible}
      />
    {/each}
  </div>
{/each}
