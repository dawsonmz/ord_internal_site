<script lang="ts">
    export let data;
</script>

{#if data.seasons && data.training_plan_summaries}
    <div class="flex flex-col items-center">
        {#each data.seasons as season}
            {#if data.training_plan_summaries.has(season._id)}
                <div class="text-4xl font-semibold my-5">{season.display_text}</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mx-5 sm:mx-10 md:mx-20 xl:mx-30">
                    {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
                        <a href="/beginner-plans/{season.short_text}-{trainingPlanSummary.training_number}"
                           class="btn-like
                                  rounded-xl
                                  border-2
                                  border-base-200
                                  shadow-2xl
                                  hover:bg-[var(--btn-hover-color)]
                                  hover:border-[var(--btn-hover-color)]
                                  p-5">
                            <div class="text-3xl font-semibold mb-4">Training {trainingPlanSummary.training_number}</div>
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
