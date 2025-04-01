<script lang="ts">
    export let data;
</script>

{#if data.training_plans && data.training_plans.length}
    <ul class="list bg-base-100 rounded-box shadow-md m-10">
        <li class="p-4 pb-2 text-xl font-semibold tracking-wide">Beginners Training Plans</li>
        {#each data.training_plans as trainingPlan}
        <li class="list-row">
            <div class="text-6xl font-bold">{trainingPlan.lesson_number}</div>
            <div class="rich-text">
                <div class="text-sm uppercase font-semibold">{trainingPlan.date_text}</div>
                {#each trainingPlan.module_objects as module}
                <div>{module.start_time}</div>
                {@html module.text_html}
                {/each}
            </div>
        </li>
        {/each}
    </ul>
{:else}
    <div>No data found.</div>
{/if}
