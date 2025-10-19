<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import Button from '$lib/components/button.svelte';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import ModuleTab from '$lib/components/module_tab.svelte';

  let { modules, form } = $props();
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
    </div>
    <Tabs value={tabStates[index]} onValueChange={e => tabStates[index] = e.value}>
      <Tabs.List class="mb-3">
        <Tabs.Trigger value="short">
          <ModuleTab value="Short" selectedValue={tabStates[index]} />
        </Tabs.Trigger>
        {#if module.detailed_text}
          <Tabs.Trigger value="detailed" disabled={!module.detailed_text}>
            <ModuleTab value="Detailed" selectedValue={tabStates[index]} />
          </Tabs.Trigger>
        {/if}
        {#if module.resources}
          <Tabs.Trigger value="resources" disabled={!module.resources}>
            <ModuleTab value="Resources" selectedValue={tabStates[index]} />
          </Tabs.Trigger>
        {/if}
        <Tabs.Trigger value="feedback">
          <ModuleTab value="Feedback" selectedValue={tabStates[index]} />
        </Tabs.Trigger>
        <Tabs.Indicator class="border-y-[1px] w-[84px]" />
      </Tabs.List>

      <Tabs.Content value="short">
        <div class="rich-text text-sm">
          <PortableText value={module.short_text} />
        </div>
      </Tabs.Content>
      {#if module.detailed_text}
        <Tabs.Content value="detailed">
          <div class="rich-text text-sm">
            <PortableText value={module.detailed_text} />
          </div>
        </Tabs.Content>
      {/if}
      {#if module.resources}
        <Tabs.Content value="resources">
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
      <Tabs.Content value="feedback">
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
