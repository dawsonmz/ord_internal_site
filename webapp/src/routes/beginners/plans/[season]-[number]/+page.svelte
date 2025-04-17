<script lang="ts">
    export let data;
</script>

{#if data.training_plan}
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 mx-5">
        <div class="lg:col-start-2 lg:col-span-3 text-4xl font-bold">Lesson {data.training_plan.lesson_number}</div>
        <div class="lg:col-start-2 lg:col-span-3 text-2xl font-semibold">{data.training_plan.date_text}</div>
        {#each data.training_plan.module_objects as module}
            <div class="rich-text lg:col-start-2 lg:col-span-3">
                <div class="text-lg font-semibold mb-1">{module.start_time} - {module.title} ({module.minutes} min)</div>
                {@html module.text_html}
            </div>
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
