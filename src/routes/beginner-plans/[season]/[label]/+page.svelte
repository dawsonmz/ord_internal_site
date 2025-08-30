<script lang="ts">
  import { page } from '$app/state';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index.js';
  import ModuleGroup from '$lib/components/module_group.svelte';

  let { data } = $props();
  const trainingPlan = data.training_plan!;
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans/{page.params.season}">{trainingPlan.season}</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{trainingPlan.training_label}</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 mx-8">
  <div>
    <div class="text-2xl font-semibold mb-2">Beginners Training {trainingPlan.training_label}</div>
    <div class="text-base">{trainingPlan.date_text}</div>
  </div>
  <ModuleGroup modules={trainingPlan.modules} />
</div>
