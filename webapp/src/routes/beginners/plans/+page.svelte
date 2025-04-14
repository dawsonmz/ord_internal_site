<script lang="ts">
    export let data;
</script>

{#if data.seasons && data.training_plan_summaries}
    <ul class="list bg-base-100 rounded-box shadow-md m-10">
        {#each data.seasons as season}
            {#if data.training_plan_summaries.has(season._id)}
                <li class="p-4 pb-2 text-4xl font-semibold tracking-wide">{season.display_text}</li>
                {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
                <li class="list-col-wrap m-3">
                    <a role="button" class="btn btn-secondary text-xl pl-2.5 pr-2.5 pt-2.5 pb-3" href="/beginners/plans/{season.short_text}-{trainingPlanSummary.lesson_number}">
                        Lesson {trainingPlanSummary.lesson_number}
                    </a>
                    <div class="text-lg font-semibold m-2">{trainingPlanSummary.date_text}</div>
                    <div class="text-md m-2">{trainingPlanSummary.summary}</div>
                </li>
                {/each}
            {/if}
        {/each}
    </ul>
{:else}
    <div>No data found.</div>
{/if}
