<script lang="ts">
    import ModuleGroup from '$lib/components/module_group.svelte';
    
    let { data } = $props();
</script>

{#if data.training_plan}
    <div class="flex flex-col gap-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60">
        <div class="text-4xl font-bold">Training {data.training_plan.training_number}</div>
        <div class="text-2xl font-semibold">{data.training_plan.date_text}</div>
        <ModuleGroup modules={data.training_plan.module_objects} />
    </div>
{:else}
    <div>No data found.</div>
{/if}
