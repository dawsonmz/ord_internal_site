<script lang="ts">
    export let data;
</script>

{#if data.modulesByCategory}
    {#each ['Routine', 'First training'] as category}
        {#each data.modulesByCategory.get(category)! as module}
        <div class="card mt-2 bg-base-100 tracking-wide">
            <div class="card-body">
                <h2 class="card-title">{module.title}</h2>
                <div class="badge badge-secondary badge-lg font-semibold pl-2 pr-2 pt-3 pb-3.5">{module.minutes} min</div>
                <div class="rich-text">{@html module.text_html}</div>
            </div>
        </div>
        <div class="divider"></div>
        {/each}
    {/each}
{:else}
    <div>No data found.</div>
{/if}
