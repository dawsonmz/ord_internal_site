<script lang="ts">
    export let data;
</script>

{#if data.seasons && data.training_plan_summaries}
    <ul class="list bg-base-100 rounded-box shadow-md m-10">
        {#each data.seasons as season}
            <li class="p-4 pb-2 text-4xl font-semibold tracking-wide">{season.display_text}</li>
            {#each data.training_plan_summaries.get(season._id)! as trainingPlanSummary}
            <li class="list-col-wrap m-3">
                <div class="text-2xl font-semibold m-2"><a href="/beginners/plans/{season.short_text}-{trainingPlanSummary.lesson_number}">Lesson {trainingPlanSummary.lesson_number}</a></div>
                <div class="text-lg font-semibold m-2">{trainingPlanSummary.date_text}</div>
            </li>
            {/each}
        {/each}
    </ul>
{:else}
    <div>No data found.</div>
{/if}
