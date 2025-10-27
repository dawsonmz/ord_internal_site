<script lang="ts">
  import { page } from '$app/state';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import ModuleGroup from '$lib/components/module_group.svelte';

  let { data, form } = $props();
  const showHidden = page.url.searchParams.get('show-hidden')?.trim().toLowerCase() === 'true';
  const hiddenQuery = showHidden ? '?show-hidden=true' : '';
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-plans{hiddenQuery}">Beginner Plans</CrumbLink>
  <CrumbSeparator />
  {#if data.training_plan}
    <CrumbLink href="/beginner-plans{hiddenQuery}#{page.params.season}">{data.training_plan.season}</CrumbLink>
    <CrumbSeparator />
    <CrumbPage>{data.training_plan.training_label}</CrumbPage>
  {:else}
    <CrumbPage><span class="italic">Not found</span></CrumbPage>
  {/if}
</Crumb>

{#if data.training_plan}
  <div class="flex gap-2 text-2xl">
    <div class="font-semibold">Beginners Training {data.training_plan.training_label}</div>
    {#if !data.training_plan.visible}
      <div class="italic text-[var(--error-color)]">(hidden)</div>
    {/if}
  </div>
  <div class="subheading">{data.training_plan.date_text}</div>
  <div>{data.training_plan.summary}</div>
  <FeedbackDialog label="Give feedback on the training plan" labelClasses="text-sm italic" {form} formId="training-plan" />
  <ModuleGroup modules={data.training_plan.modules} form={form} />
{:else}
  Sorry, but the requested resource was not found.
{/if}
