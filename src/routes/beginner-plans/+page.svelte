<script lang="ts">
    import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "$lib/components/ui/breadcrumb/index.js";
    import LinkCard from '$lib/components/ui/link_card.svelte';
    import LinkCardGrid from '$lib/components/ui/link_card_grid.svelte';

    let { data } = $props();
</script>

<Breadcrumb class="mx-8 mb-5">
    <BreadcrumbList>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbPage>Beginner Training Plans</BreadcrumbPage>
    </BreadcrumbList>
</Breadcrumb>

<div class="flex flex-col gap-10 mx-8">
    {#each data.seasons as season}
        {#if data.training_plan_summaries.has(season._id)}
            <LinkCardGrid header={season.display_text.valueOf()}>
                {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
                    <LinkCard
                        title="Training {trainingPlanSummary.training_number}"
                        subtitle={trainingPlanSummary.date_text.valueOf()}
                        description={trainingPlanSummary.summary}
                        url="/beginner-plans/{season.short_text}-{trainingPlanSummary.training_number}"
                    />
                {/each}
            </LinkCardGrid>
        {/if}
    {/each}
</div>
