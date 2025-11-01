<script lang="ts">
  import { Dot } from '@lucide/svelte/icons';
  import { PortableText } from '@portabletext/svelte';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import PortableImage from '$lib/components/portable_text/portable_image.svelte';
  import TabControl from '$lib/components/tab_control.svelte';

  let { module, tabState, form, formId } = $props();
  const components = { types: { image: PortableImage }};
</script>

<div class="flex items-center gap-1 text-base">
  {#if module.start_time} 
    <div>{module.start_time}</div>
    <Dot />
  {/if}
  <div>{module.minutes} min</div>
  <Dot />
  <FeedbackDialog context="Module: {module.title}" form={form} formId={formId} />
</div>
<Tabs value={tabState} onValueChange={e => tabState = e.value}>
  <Tabs.List class="mb-4">
    <TabControl value='Short' selectedValue={tabState} width="[84px]" textSize="text-sm" />
    {#if module.detailed_text}
      <TabControl value='Detailed' selectedValue={tabState} width="[84px]" textSize="text-sm" />
    {/if}
    {#if module.resources}
      <TabControl value='Resources' selectedValue={tabState} width="[84px]" textSize="text-sm" />
    {/if}
    <Tabs.Indicator class="border-y-[1px] w-[84px]" />
  </Tabs.List>

  <Tabs.Content value='Short'>
    <div class="rich-text text-sm">
      <PortableText value={module.short_text} {components} />
    </div>
  </Tabs.Content>
  {#if module.detailed_text}
    <Tabs.Content value='Detailed'>
      <div class="rich-text text-sm">
        <PortableText value={module.detailed_text} {components} />
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
</Tabs>
