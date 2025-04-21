<script lang="ts">
    import ModuleGroup from '$lib/components/module_group.svelte';

    let { data } = $props();
</script>

{#if data.training_plan}
    <div class="flex flex-col gap-6 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60">
        <div>
            <div class="text-3xl font-bold mb-2">Beginners Training {data.training_plan.training_number}</div>
            <div class="text-xl font-semibold">{data.training_plan.date_text}</div>
        </div>
        <ModuleGroup modules={data.training_plan.module_objects} />
    </div>
{:else}
    <div>No data found.</div>
{/if}
