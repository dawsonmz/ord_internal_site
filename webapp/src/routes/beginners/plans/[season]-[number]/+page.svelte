<script lang="ts">
    export let data;
</script>

{#if data.training_plan}
    <div class="text-2xl font-semibold m-2">Lesson {data.training_plan.lesson_number}</div>
    <div class="text-lg font-semibold m-2">{data.training_plan.date_text}</div>
    <div class="rich-text m-2">
        {#each data.training_plan.module_objects as module}
            <div class="badge badge-neutral badge-outline badge-lg font-semibold mt-4 mb-1 pl-2 pr-2 pt-3 pb-3.5">{module.start_time} - {module.minutes} min</div>
            <div class="text-md font-bold ml-2 mb-1">{module.title}</div>
            {@html module.text_html}
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
