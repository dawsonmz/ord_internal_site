<script lang="ts">
    import Module from '$lib/components/module.svelte';

    export let data;
    let index = 0;
    let incrementIndex = () => {
        index++;
        return index;
    };
</script>

{#if data.modulesByCategory}
    <div class="grid grid-cols-1 gap-4 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60">
        {#each ['Routine', 'First training'] as category}
            <div class="text-3xl font-bold mt-2">Category: {category}</div>
            {#each data.modulesByCategory.get(category)! as module}
                <Module module={module} index={incrementIndex()} />
            {/each}
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
