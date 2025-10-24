<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import Button from '$lib/components/button.svelte';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import TabControl from '$lib/components/tab_control.svelte';

  let { modules, form } = $props();
  let tabStates = $state(new Array<string>(modules.length).fill('Short'));

  function showAllShort() {
    tabStates.forEach((_val: string, index: number, arr: string[]) => arr[index] = 'Short');
  }

  function showAllDetailed() {
    tabStates.forEach(
        (_val: string, index: number, arr: string[]) => {
          if (modules[index].detailed_text) {
            arr[index] = 'Detailed';
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
    <div class="text-lg font-semibold mb-2">{module.title}</div>
    <div class="flex items-center gap-3 text-base">
      {#if module.start_time} 
        <span>{module.start_time}</span>
      {/if}
      <span class="badge badge-colors shadow-xs text-base px-2 py-0.5">{module.minutes} min</span>
    </div>
    <Tabs value={tabStates[index]} onValueChange={e => tabStates[index] = e.value}>
      <Tabs.List class="mb-4">
        <TabControl value='Short' selectedValue={tabStates[index]} width="[84px]" textSize="text-sm" />
        {#if module.detailed_text}
          <TabControl value='Detailed' selectedValue={tabStates[index]} width="[84px]" textSize="text-sm" />
        {/if}
        {#if module.resources}
          <TabControl value='Resources' selectedValue={tabStates[index]} width="[84px]" textSize="text-sm" />
        {/if}
        <TabControl value='Feedback' selectedValue={tabStates[index]} width="[84px]" textSize="text-sm" />
        <Tabs.Indicator class="border-y-[1px] w-[84px]" />
      </Tabs.List>

      <Tabs.Content value='Short'>
        <div class="rich-text text-sm">
          <PortableText value={module.short_text} />
        </div>
      </Tabs.Content>
      {#if module.detailed_text}
        <Tabs.Content value='Detailed'>
          <div class="rich-text text-sm">
            <PortableText value={module.detailed_text} />
          </div>
        </Tabs.Content>
      {/if}
      {#if module.resources}
        <Tabs.Content value='Resources'>
          {#each module.resources as imageResource}
            <div class="card
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
        </Tabs.Content>
      {/if}
      <Tabs.Content value='Feedback'>
        <FeedbackDialog
            label="Give feedback on this module:"
            labelClasses="text-sm"
            context="Module: {module.title}"
            form={form}
            formId="module-{index}"
        />
      </Tabs.Content>
    </Tabs>
  </div>
{/each}
