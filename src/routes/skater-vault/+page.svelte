<script lang="ts">
  import { Send } from '@lucide/svelte/icons';
  import AnimatedCheck from '$lib/components/animated_check.svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import FormDialog from '$lib/components/form_dialog.svelte';

  let { data, form } = $props();

  let query = $state('');
  let skaterNumbers = $derived(
    data.skater_numbers.filter(
        skaterNumber => skaterNumber.skater_number?.includes(query.trim()) || skaterNumber.derby_name_lower?.includes(query.trim())
    )
  );

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
<FormDialog {form} {formId} formAction="?/requestnumber" openFn={() => form = null}>
  {#snippet trigger()}
    <div class="flex items-center gap-2 block-hover w-fit">
      {#if form?.formId == formId && form?.success}
        <AnimatedCheck color="green" />
      {:else}
        <Send size=24 />
      {/if}
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
      {#if form?.formId == formId && form.errors?.name}
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
      {#if form?.formId == formId && form.errors?.number}
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
      {#if form?.formId == formId && form.errors?.contact}
        <span class="text-sm font-semibold text-[var(--error-color)]">* {form.errors.contact}</span>
      {/if}
      {#if data.email}
        <div class="input text-sm py-2">{data.email}</div>
        <input type="hidden" name="contact" value={data.email} />
      {:else}
        <input
            type="text"
            name="contact"
            class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2"
            maxlength=128
        />
      {/if}
    </label>
  {/snippet}
</FormDialog>

<div class="max-w-2xl flex flex-col gap-2">
  <input
      type="text"
      class="input bg-white dark:bg-[var(--dark-color)]"
      placeholder="Search for number or name"
      bind:value={query}
  />
  {#if skaterNumbers.length}
    <div class="columns-1 sm:columns-2 gap-8 mt-2">
      {#each skaterNumbers as skaterNumber}
        <div class="flex items-center gap-3 break-inside-avoid mb-3">
          <div class="text-center
                      font-semibold
                      w-[56px]
                      rounded-sm
                      shadow-sm
                      bg-[var(--light-color)]
                      dark:text-[var(--dark-color)]"
          >
            {skaterNumber.skater_number ?? ""}
          </div>
          <div class="text-base">{skaterNumber.derby_name}</div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="font-semibold">No results found.</div>
  {/if}
</div>
