<script lang="ts">
    export let data;
</script>

{#if data.modules && data.modules.length}
    <ul class="list bg-base-100 rounded-box shadow-md m-10">
        <li class="p-4 pb-2 text-xl font-semibold tracking-wide">Beginners Training Modules</li>
        {#each data.modules as module}
        <li class="list-row">
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
