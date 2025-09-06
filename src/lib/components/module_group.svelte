<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import Button from '$lib/components/button.svelte';
  import FeedbackModal from '$lib/components/feedback_modal.svelte';

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
  <Button clickAction={showAllShort} justAButton>All Short</Button>
  <Button clickAction={showAllDetailed} justAButton>All Detailed</Button>
</div>
{#each modules as module, index}
  <div>
    <div class="text-lg font-semibold mb-1">{module.title}</div>
    <div class="flex items-center gap-3 text-base">
      {#if module.start_time} 
        <span>{module.start_time}</span>
      {/if}
      <span class="badge badge-colors shadow-xs text-base px-2 py-0.5">{module.minutes} min</span>
      <FeedbackModal context="Module: {module.title}" />
    </div>
    <Tabs value={tabStates[index]} onValueChange={(e) => (tabStates[index] = e.value)}>
      {#snippet list()}
        <Tabs.Control value="short"><span class="text-sm">Short</span></Tabs.Control>
        {#if module.detailed_text}
          <Tabs.Control value="detailed" disabled={!module.detailed_text}><span class="text-sm">Detailed</span></Tabs.Control>
        {/if}
        {#if module.resources}
          <Tabs.Control value="resources" disabled={!module.resources}><span class="text-sm">Resources</span></Tabs.Control>
        {/if}
      {/snippet}
      {#snippet content()}
        <Tabs.Panel value="short">
          <div class="rich-text text-sm">
            <PortableText value={module.short_text} />
          </div>
        </Tabs.Panel>
        {#if module.detailed_text}
          <Tabs.Panel value="detailed">
            <div class="rich-text text-sm">
              <PortableText value={module.detailed_text} />
            </div>
          </Tabs.Panel>
        {/if}
        {#if module.resources}
          <Tabs.Panel value="resources">
            {#each module.resources as imageResource}
              <div
                  class="card
                         border-[1px]
                         border-[var(--light-color)]
                         divide-[var(--light-color)]
                         block
                         max-w-[300px]
                         divide-y
                         overflow-hidden
                         mb-5
                         text-sm"
              >
                <header>
                  <img src={imageResource.image_url} alt={imageResource.alt} />
                </header>
                <article class="p-2">
                  <div>{imageResource.description}</div>
                </article>
              </div>
            {/each}
          </Tabs.Panel>
        {/if}
      {/snippet}
    </Tabs>
  </div>
{/each}
