<script lang="ts">
    import { Tabs } from '@skeletonlabs/skeleton-svelte';

    let { modules } = $props();
    let tabStates = $state(new Array<string>(modules.length).fill('short'));

    function showAllShort() {
        tabStates.forEach((_val: string, index: number, arr: string[]) => arr[index] = 'short');
    }

    function showAllDetailed() {
        tabStates.forEach(
            (_val: string, index: number, arr: string[]) => {
                if (modules[index].detailed_text) {
                    arr[index] = 'detailed';
                }
            }
        );
    }
</script>

<div>
    <button class="btn preset-tonal-primary bg-hover" onclick={showAllShort}>Collapse All</button>
    <button class="btn preset-tonal-primary bg-hover" onclick={showAllDetailed}>Expand All</button>
</div>
{#each modules as module, index}
    <div class="text-lg font-semibold mb-2">{module.start_time ? `${module.start_time} - ` : ''}{module.title} ({module.minutes} min)</div>
    <Tabs value={tabStates[index]} onValueChange={(e) => (tabStates[index] = e.value)}>
        {#snippet list()}
            <Tabs.Control value="short">Short</Tabs.Control>
            {#if module.detailed_text}
                <Tabs.Control value="detailed" disabled={!module.detailed_text}>Detailed</Tabs.Control>
            {/if}
            {#if module.resources}
                <Tabs.Control value="resources" disabled>Resources</Tabs.Control>
            {/if}
        {/snippet}
        {#snippet content()}
            <Tabs.Panel value="short">
                <div class="rich-text">{@html module.short_text_html}</div>
            </Tabs.Panel>
            {#if module.detailed_text}
                <Tabs.Panel value="detailed">
                    <div class="rich-text">{@html module.detailed_text_html}</div>
                </Tabs.Panel>
            {/if}
            {#if module.resources}
                <Tabs.Panel value="resources">
                    Additional resources
                </Tabs.Panel>
            {/if}
        {/snippet}
    </Tabs>
{/each}
