<script lang="ts">
    import { Tabs } from '@skeletonlabs/skeleton-svelte';
    import Button from '$lib/components/ui/button.svelte';

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

<div class="flex gap-2">
    <Button clickAction={showAllShort}>Collapse All</Button>
    <Button clickAction={showAllDetailed}>Expand All</Button>
</div>
{#each modules as module, index}
    <div>
        <div class="text-lg font-semibold mb-1">{module.title}</div>
        <div class="text-base">
            {#if module.start_time} 
                <span class="mr-2">{module.start_time}</span>
            {/if}
            <span class="badge preset-tonal-tertiary shadow-xs text-base px-2 py-0">{module.minutes} min</span>
        </div>
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
    </div>
{/each}
