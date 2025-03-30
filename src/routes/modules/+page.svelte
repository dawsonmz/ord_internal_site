<script lang="ts">
    export let data;
</script>

{#if data.modules && data.modules.length}
<ul class="list bg-base-100 rounded-box shadow-md">
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Beginners Training Modules</li>
    {#each data.modules as module}
    <li class="list-row">
        <div class="text-6xl font-bold">{module.order}</div>
        <div class="rich-text">
            <div class="text-sm uppercase font-semibold">{module.title}</div>
            {@html module.text_html}
        </div>
    </li>
    {/each}
</ul>
{:else}
  <div>No data found.</div>
{/if}
