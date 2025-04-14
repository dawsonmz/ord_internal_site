<script lang="ts">
    export let data;
</script>

{#if data.training_plan}
    <div class="text-2xl font-semibold m-2">Lesson {data.training_plan.lesson_number}</div>
    <div class="text-lg font-semibold m-2">{data.training_plan.date_text}</div>
    <div class="rich-text m-2">
        {#each data.training_plan.module_objects as module}
        <div class="mt-3 badge badge-primary font-bold">{module.start_time}</div>
        {@html module.text_html}
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
