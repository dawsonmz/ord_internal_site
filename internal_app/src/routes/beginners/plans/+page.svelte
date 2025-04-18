<script lang="ts">
    export let data;
</script>

{#if data.seasons && data.training_plan_summaries}
    <div class="flex flex-col items-center">
        {#each data.seasons as season}
            {#if data.training_plan_summaries.has(season._id)}
                <div class="text-4xl font-semibold my-5">{season.display_text}</div>
                <div class="grid grid-cols-3 gap-10 mx-50 my-5">
                    {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
                        <a href="/beginners/plans/{season.short_text}-{trainingPlanSummary.lesson_number}" class="rounded-xl border-2 border-gray-100 hover:border-gray-300 shadow-2xl p-5">
                            <div class="text-3xl font-semibold mb-4">Lesson {trainingPlanSummary.lesson_number}</div>
                            <div class="text-lg font-semibold">{trainingPlanSummary.date_text}</div>
                            <div class="text-md">{trainingPlanSummary.summary}</div>
                        </a>
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
