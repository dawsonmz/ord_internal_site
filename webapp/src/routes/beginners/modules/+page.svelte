<script lang="ts">
    export let data;
</script>

{#if data.modulesByCategory}
    <div class="flex flex-col items-center">
        {#each ['Routine', 'First training'] as category}
            <div class="text-2xl font-semibold mt-4 w-2xl">Category: {category}</div>
            {#each data.modulesByCategory.get(category)! as module}
                <div class="text-lg font-semibold mt-5 mb-2 w-2xl">{module.title}</div>
                <div class="w-2xl"><div class="badge badge-secondary badge-lg font-semibold pl-2 pr-2 pt-3 pb-3.5">{module.minutes} min</div></div>
                <div class="rich-text w-2xl">{@html module.text_html}</div>
            {/each}
        {/each}
    </div>
{:else}
    <div>No data found.</div>
{/if}
