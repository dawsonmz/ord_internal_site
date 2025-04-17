<script lang="ts">
    export let data;
</script>

{#if data.modulesByCategory}
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 mx-5">
        {#each ['Routine', 'First training'] as category}
            <div class="lg:col-start-2 lg:col-span-3 text-4xl font-bold">Category: {category}</div>
            {#each data.modulesByCategory.get(category)! as module}
                <div class="rich-text lg:col-start-2 lg:col-span-3">
                    <div class="text-lg font-semibold">{module.title} ({module.minutes} min)</div>
                    {@html module.text_html}
                </div>
            {/each}
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
