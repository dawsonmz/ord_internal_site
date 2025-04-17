<script lang="ts">
    import Module from '$lib/components/module.svelte';
    export let data;

</script>

{#if data.training_plan}
    <div class="grid grid-cols-1 gap-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60">
        <div class="text-4xl font-bold">Lesson {data.training_plan.lesson_number}</div>
        <div class="text-2xl font-semibold">{data.training_plan.date_text}</div>
        {#each data.training_plan.module_objects as module, index}
            <Module module={module} index={index} />
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
