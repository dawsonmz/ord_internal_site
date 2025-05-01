<script lang="ts">
    import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from "$lib/components/ui/breadcrumb/index.js";
    import LinkCard from '$lib/components/ui/link_card.svelte';
    import LinkCardGrid from '$lib/components/ui/link_card_grid.svelte';

    let { data } = $props();
</script>

<Crumb baseClasses="mx-8 mb-5">
    <CrumbHome />
    <CrumbSeparator />
    <CrumbPage>Beginner Plans</CrumbPage>
</Crumb>

<div class="flex flex-col gap-10 mx-8">
    {#each data.seasons as season}
        {#if data.training_plan_summaries.has(season._id)}
            <LinkCardGrid header={season.display_text.valueOf()}>
                {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
                    <LinkCard
                        title="Training {trainingPlanSummary.training_label}"
                        subtitle={trainingPlanSummary.date_text.valueOf()}
                        description={trainingPlanSummary.summary}
                        url="/beginner-plans/{season.short_text}-{trainingPlanSummary.training_label}"
                    />
                {/each}
            </LinkCardGrid>
        {/if}
    {/each}
</div>
