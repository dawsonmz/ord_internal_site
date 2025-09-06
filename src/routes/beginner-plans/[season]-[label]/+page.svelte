<script lang="ts">
  import { page } from '$app/state';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index.js';
    import FeedbackModal from '$lib/components/feedback_modal.svelte';
  import ModuleGroup from '$lib/components/module_group.svelte';

  let { data, form } = $props();
  const trainingPlan = data.training_plan!;
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans#{page.params.season}">{trainingPlan.season}</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{trainingPlan.training_label}</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 mx-8">
  <div class="flex flex-col gap-2">
    <div class="text-2xl font-semibold">Beginners Training {trainingPlan.training_label}</div>
    <div class="text-base subheading">{trainingPlan.date_text}</div>
    <div class="text-sm">{trainingPlan.summary}</div>
    <FeedbackModal baseClasses="text-sm" label="Feedback on the training?" iconClasses="size-5" form={form} />
  </div>
  <ModuleGroup modules={trainingPlan.modules} form={form} />
</div>
