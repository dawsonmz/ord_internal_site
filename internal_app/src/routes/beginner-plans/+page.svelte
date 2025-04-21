<script lang="ts">
    export let data;
</script>

<div class="flex flex-col gap-10 items-center">
    {#each data.seasons as season}
        {#if data.training_plan_summaries.has(season._id)}
            <div class="text-3xl font-semibold">{season.display_text}</div>
            <div class="link-card-grid">
                {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
                    <a href="/beginner-plans/{season.short_text}-{trainingPlanSummary.training_number}" class="link-card">
                        <div class="text-2xl font-semibold mb-2">Training {trainingPlanSummary.training_number}</div>
                        <div class="text-lg font-semibold">{trainingPlanSummary.date_text}</div>
                        <div>{trainingPlanSummary.summary}</div>
                    </a>
                {/each}
            </div>
        {/if}
    {/each}
</div>
