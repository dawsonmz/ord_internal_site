<script lang="ts">
    let { modules, prefix } = $props();
    
    let showStates = $state(new Array<string>(modules.length).fill('short'));

    function showAllShort() {
        showStates.forEach((_val: string, index: number, arr: string[]) => arr[index] = 'short');
    }

    function showAllDetailed() {
        showStates.forEach(
            (_val: string, index: number, arr: string[]) => {
                if (modules[index].detailed_text) {
                    arr[index] = 'detailed';
                }
            }
        );
    }
</script>

<div>
    <button class="btn" onclick={showAllShort}>Show all short</button>
    <button class="btn" onclick={showAllDetailed}>Show all detailed</button>
</div>
{#each modules as module, index}
    <div class="text-lg font-semibold mb-2">{module.start_time ? `${module.start_time} - ` : ''}{module.title} ({module.minutes} min)</div>
    <div class="tabs tabs-box shadow-lg">
        <input type="radio" name="module_tabs_{prefix}_{index}" class="tab font-semibold checked:text-base-content m-1" aria-label="Short" value="short" bind:group={showStates[index]} />
        <div class="tab-content rich-text p-3">{@html module.short_text_html}</div>

        <input type="radio" name="module_tabs_{prefix}_{index}" class="tab font-semibold checked:text-base-content m-1" aria-label="Detailed" value="detailed" bind:group={showStates[index]} disabled="{!module.detailed_text}" />
        <div class="tab-content rich-text p-3">{@html module.detailed_text_html}</div>
        
        <input type="radio" name="module_tabs_{prefix}_{index}" class="tab font-semibold checked:text-base-content m-1" aria-label="Resources" disabled="{!module.resources}" />
        <div class="tab-content rich-text p-3">Additional resources</div>
    </div>
{/each}
