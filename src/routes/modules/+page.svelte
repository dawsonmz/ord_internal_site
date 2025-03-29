<script lang="ts">
    export let data;
</script>

<h1>Beginners Training Modules</h1>
{#if data.modules && data.modules.length}
    {#each data.modules as module}
        <div>
            <h2>{module.title}</h2>
            {@html module.text_html}
        </div>
    {/each}
{/if}