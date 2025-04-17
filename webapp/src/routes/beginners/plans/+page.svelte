<script lang="ts">
    export let data;
</script>

{#if data.seasons && data.training_plan_summaries}
    {#each data.seasons as season}
        {#if data.training_plan_summaries.has(season._id)}
            <div class="text-4xl font-semibold">{season.display_text}</div>
            {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
                <div>
                    <a class="text-xl" href="/beginners/plans/{season.short_text}-{trainingPlanSummary.lesson_number}">
                        Lesson {trainingPlanSummary.lesson_number}
                    </a>
                </div>
                <div class="text-lg font-semibold">{trainingPlanSummary.date_text}</div>
                <div class="text-md">{trainingPlanSummary.summary}</div>
            {/each}
        {/if}
    {/each}
{:else}
    <div>No data found.</div>
{/if}
