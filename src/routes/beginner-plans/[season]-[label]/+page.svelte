<script lang="ts">
  import { page } from '$app/state';
  import { Minus, Plus } from '@lucide/svelte/icons';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import Module from '$lib/components/module.svelte';
  import ModuleHeader from '$lib/components/module_header.svelte';

  let { data, form } = $props();
  const showHidden = $derived(page.url.searchParams.get('show-hidden')?.trim().toLowerCase() === 'true');
  const hiddenQuery = $derived(showHidden ? '?show-hidden=true' : '');

  const modules = $derived(data.training_plan?.modules ?? []);
  let tabStates = $derived(new Array<string>(modules.length).fill('Short'));

  function showAllShort() {
    tabStates.forEach((_val: string, index: number, arr: string[]) => arr[index] = 'Short');
    tabStates = [...tabStates];
  }

  function showAllDetailed() {
    tabStates.forEach(
        (_val: string, index: number, arr: string[]) => {
          if (modules[index].detailed_text) {
            arr[index] = 'Detailed';
          }
        }
    );
    tabStates = [...tabStates];
  }
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans{hiddenQuery}">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans{hiddenQuery}#{page.params.season}">{data.training_plan.season}</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.training_plan.training_label}</CrumbPage>
</Crumb>

<div class="flex gap-2 text-2xl">
  <div class="font-semibold">Beginners Training {data.training_plan.training_label}</div>
  {#if !data.training_plan.visible}
    <div class="italic text-[var(--error-color)]">(hidden)</div>
  {/if}
</div>
<div class="subheading">{data.training_plan.date_text}</div>
<div>{data.training_plan.summary}</div>
<FeedbackDialog label="Give feedback on the training plan" labelClasses="text-sm italic" {form} formId="training-plan" />

<div class="flex gap-2">
  <button type="button" class="flex justify-center items-center gap-2 w-[160px] text-sm p-2 button-style" onclick={showAllDetailed}>
    <Plus size={20} />
    <div class="mr-2">All Detailed</div>
  </button>
  <button type="button" class="flex justify-center items-center gap-2 w-[160px] text-sm p-2 button-style" onclick={showAllShort}>
    <Minus size={20} />
    <div class="mr-2">All Short</div>
  </button>
</div>
{#each modules as module, index}
  <div class="top-faded-border">
    <ModuleHeader baseClasses="mb-1" {module} />
    <Module {module} {tabStates} {index} {form} />
  </div>
{/each}
