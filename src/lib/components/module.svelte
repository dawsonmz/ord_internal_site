<script lang="ts">
  import { Dot } from '@lucide/svelte/icons';
  import { PortableText } from '@portabletext/svelte';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import PortableModuleImage from '$lib/components/portable_text/portable_module_image.svelte';
  import PortableNormal from '$lib/components/portable_text/portable_normal.svelte';
  import TabControl from '$lib/components/tab_control.svelte';

  let { module, tabStates, index, form } = $props();

  const components = {
    types: { image: PortableModuleImage },
    block: { normal: PortableNormal },
  };
</script>

<div class="flex items-center gap-1 text-base">
  {#if module.start_time} 
    <div>{module.start_time}</div>
    <Dot />
  {/if}
  <div>{module.minutes} min</div>
  <Dot />
  <FeedbackDialog context="Module: {module.title}" {form} formId="module-{index}" />
</div>
<Tabs
    value={tabStates[index]}
    onValueChange={e => {
      tabStates[index] = e.value;
      tabStates = [...tabStates];
    }}
>
  <Tabs.List class="mb-4">
    <TabControl value='Short' selectedValue={tabStates[index]} width="[90px]" textSize="text-sm" />
    {#if module.detailed_text}
      <TabControl value='Detailed' selectedValue={tabStates[index]} width="[90px]" textSize="text-sm" />
    {/if}
    <Tabs.Indicator class="border-y-[1px] w-[90px]" />
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
</Tabs>
