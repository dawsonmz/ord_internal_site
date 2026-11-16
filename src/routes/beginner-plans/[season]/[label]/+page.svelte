<script lang="ts">
  import { page } from '$app/state';
  import { Minus, Plus } from '@lucide/svelte/icons';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import Module from '$lib/components/module.svelte';
  import ModuleHeader from '$lib/components/module_header.svelte';

  let { data } = $props();

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

<svelte:head>
  <title>Beginners Training {data.training_plan.training_label} · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans/{page.params.season}">{data.training_plan.season}</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.training_plan.training_label}</CrumbPage>
</Crumb>

<h1 class="text-2xl font-semibold">Beginners Training {data.training_plan.training_label}</h1>
<div class="subheading">{data.training_plan.date_text}</div>
<div>{data.training_plan.summary}</div>

<div class="flex gap-2">
  <button type="button" class="flex justify-center items-center gap-2 w-40 text-sm p-2 button-secondary" onclick={showAllShort}>
    <Minus size={20} />
    <div class="mr-2">All Short</div>
  </button>
  <button type="button" class="flex justify-center items-center gap-2 w-40 text-sm p-2 button-secondary" onclick={showAllDetailed}>
    <Plus size={20} />
    <div class="mr-2">All Detailed</div>
  </button>
</div>
{#each modules as module, index}
  <div class="top-faded-border">
    <ModuleHeader baseClasses="mb-1" {module} />
    <Module {module} {tabStates} {index} />
  </div>
{/each}
