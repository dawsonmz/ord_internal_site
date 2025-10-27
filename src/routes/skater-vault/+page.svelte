<script lang="ts">
  import { Send } from '@lucide/svelte/icons';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import FormDialog from '$lib/components/form_dialog.svelte';
  import SkaterNumberGroup from '$lib/components/skater_number_group.svelte';

  let { data, form } = $props();

  let query = $state('');
  let skaterNumbers = $derived(
    data.skater_numbers.filter(
        skaterNumber => skaterNumber.skater_number?.includes(query.trim()) || skaterNumber.derby_name_lower?.includes(query.trim())
    )
  );

  let skaterSplitCount = $derived(Math.ceil(data.skater_numbers.length / 2));
  let skaterNumbersCol1 = $derived(skaterNumbers.slice(0, skaterSplitCount));
  let skaterNumbersCol2 = $derived(skaterNumbers.slice(skaterSplitCount));

  const formId = 'number-request';
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Skater Vault</CrumbPage>
</Crumb>

<div class="text-xl font-semibold">Skater Vault</div>
<div class="text-sm">
  Search for skater numbers and derby names registered with ORD, or reserve your own.
</div>
<FormDialog form={form} formId={formId} formAction="?/requestnumber" closeFn={() => form = null}>
  {#snippet trigger()}
    <div class="flex items-center gap-2 link-hover">
      <Send size=24 />
      <div class="text-md font-semibold">
        Register your derby name and number
      </div>
    </div>
  {/snippet}
  {#snippet header()}
    <div class="text-lg font-semibold">Request Number</div>
    <div class="text-sm mt-2">
      If the number is already taken, submit a request anyways. If the skater is not active, we'll reach out to verify if they want to keep it.
    </div>
  {/snippet}
  {#snippet formContent()}
    <label class="label mt-4">
      <span class="label-text text-base">Derby name:</span>
      {#if form?.formId === formId && form.errors?.name}
        <span class="text-sm font-semibold text-[var(--error-color)]">* {form.errors.name}</span>
      {/if}
      <input
          type="text"
          name="name"
          class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2"
          maxlength=64
      />
    </label>

    <label class="label mt-4">
      <span class="label-text text-base mt-2">Number:</span>
      {#if form?.formId === formId && form.errors?.number}
        <span class="text-sm font-semibold text-[var(--error-color)]">* {form.errors.number}</span>
      {/if}
      <input
          type="text"
          name="number"
          class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2"
          maxlength=10
      />
    </label>

    <label class="label mt-4">
      <span class="label-text text-base mt-2">Contact email:</span>
      {#if form?.formId === formId && form.errors?.contact}
        <span class="text-sm font-semibold text-[var(--error-color)]">* {form.errors.contact}</span>
      {/if}
      <input
          type="text"
          name="contact"
          class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2"
          maxlength=128
      />
    </label>
  {/snippet}
</FormDialog>

<input type="text" class="input max-w-148 bg-white dark:bg-[var(--dark-color)]" placeholder="Search for number or name" bind:value={query} />
{#if skaterNumbers.length}
  <div class="sm:hidden">
    <SkaterNumberGroup skaterNumbers={skaterNumbers} />
  </div>
  <div class="flex max-sm:hidden mt-2">
    <SkaterNumberGroup skaterNumbers={skaterNumbersCol1} />
    <SkaterNumberGroup skaterNumbers={skaterNumbersCol2} />
  </div>
{:else}
  <div class="font-semibold">No results found.</div>
{/if}
