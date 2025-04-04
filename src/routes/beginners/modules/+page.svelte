<script lang="ts">
    export let data;
</script>

{#if data.modules}
    {#each data.modules as module}
    <div class="card mt-2 bg-base-100 tracking-wide">
        <div class="card-body">
            <h2 class="card-title">{module.title}</h2>
            <div class="badge badge-primary font-bold">{module.minutes} min</div>
            <div class="rich-text">{@html module.text_html}</div>
        </div>
    </div>
    <div class="divider"></div>
    {/each}
{:else}
    <div>No data found.</div>
{/if}
