<script lang="ts">
    import ModuleGroup from '$lib/components/module_group.svelte';

    let { data } = $props();
</script>

{#if data.modules_by_category}
    <div class="flex flex-col gap-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60">
        {#each data.categories as category}
            <div class="text-2xl font-bold mt-2">Category: {category}</div>
            <ModuleGroup modules={data.modules_by_category.get(category)!} />
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
