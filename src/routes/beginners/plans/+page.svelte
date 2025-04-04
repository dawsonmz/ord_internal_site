<script lang="ts">
    export let data;
</script>

{#if data.seasons && data.training_plans}
    <ul class="list bg-base-100 rounded-box shadow-md m-10">
        {#each data.seasons as season}
            <li class="p-4 pb-2 text-4xl font-semibold tracking-wide">{season.display_text}</li>
            {#each data.training_plans.get(season._id)! as trainingPlan}
            <li class="list-col-wrap m-6">
                <div class="text-2xl font-semibold m-2">Lesson {trainingPlan.lesson_number}</div>
                <div class="text-lg font-semibold m-2">{trainingPlan.date_text}</div>
                <div class="rich-text m-2">
                    {#each trainingPlan.module_objects as module}
                    <div class="mt-3 badge badge-primary font-bold">{module.start_time}</div>
                    {@html module.text_html}
                    {/each}
                </div>
            </li>
            {/each}
        {/each}
    </ul>
{:else}
    <div>No data found.</div>
{/if}
