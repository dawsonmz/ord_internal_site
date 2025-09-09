<script lang="ts">
  import { Check, MessageCircleQuestion, X } from '@lucide/svelte';
  import { Modal } from '@skeletonlabs/skeleton-svelte';
  import { enhance } from '$app/forms';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index.js';
  import Button from '$lib/components/button.svelte';
  import SkaterNumberGroup from '$lib/components/skater_number_group.svelte';

  let { data, form } = $props();
  let query = $state('');

  let skaterNumbers = $derived(
    data.skater_numbers.filter(
        (skaterNumber) => {
          const queryNormalized = query.toLowerCase().trim();
          return !queryNormalized
              || skaterNumber.skater_number.includes(queryNormalized)
              || skaterNumber.derby_name_lower.includes(queryNormalized);
        }
    )
  );

  let skaterSplitCount = $derived(Math.ceil(data.skater_numbers.length / 2));
  let skaterNumbersCol1 = $derived(skaterNumbers.slice(0, skaterSplitCount));
  let skaterNumbersCol2 = $derived(skaterNumbers.slice(skaterSplitCount));

  let modalState = $state(false);

  function closeModal() {
    modalState = false;
    form = null;
  }

  function modalStateChange(e: any) {
    if (e.open) {
      modalState = true;
    } else {
      closeModal();
    }
  }
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Skater Vault</CrumbPage>
</Crumb>

<div class="flex flex-col mx-8 gap-4">
  <div class="text-xl font-semibold">Skater Vault</div>
  <div class="text-sm">
    These are the skater numbers and derby names currently registered with ORD.
  </div>
  
  <Modal
      open={modalState}
      onOpenChange={modalStateChange}
      contentBase="rounded-md shadow-2xl w-screen sm:w-[480px] min-height main-style p-6"
      positionerJustify="justify-center"
      positionerAlign="items-center"
  >
    {#snippet trigger()}
      <Button baseClasses="flex items-center gap-2" justAButton>
        <span>Register your derby name and number</span>
        <MessageCircleQuestion class="size-5" />
      </Button>
    {/snippet}
    {#snippet content()}
      <div class="text-lg font-semibold">Request Number</div>
      <div class="text-sm mt-2">
        If the number is already taken, submit a request anyways. If the skater is not active, we'll reach out to verify if they want to keep it.
      </div>
      <form method="POST" action="?/requestnumber" use:enhance>
        <input type="hidden" name="formId" value="number-request" />
        <label class="label mt-4">
          <span class="label-text text-base">Derby name:</span>
          <input
              type="text"
              name="name"
              class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2"
              required
              maxlength=64
          />
        </label>

        <label class="label mt-4">
          <span class="label-text text-base mt-2">Number:</span>
          <input
              type="text"
              name="number"
              class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2"
              required
              maxlength=10
          />
        </label>

        <label class="label mt-4">
          <span class="label-text text-base mt-2">Contact email (only stored until the request is processed):</span>
          <input
              type="text"
              name="contact"
              class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2"
              required
              maxlength=128
          />
        </label>

        <div class="flex gap-2 mt-4">
          <Button>Submit</Button>
          <Button clickAction={closeModal} justAButton>Cancel</Button>
          {@debug form}
          {#if form?.formId === 'number-request' && form?.success}
            <Check class="self-center size-7" color="green" />
            <span class="self-center text-sm font-semibold italic text-[var(--hover-color)]">
              Request submitted!
            </span>
          {:else if form?.formId === 'number-request' && form.errors?.number}
            <X class="self-center size-7" color="red" />
            <span class="self-center text-sm font-semibold italic text-[var(--hover-color)]">
              {form.errors.number}
            </span>
          {/if}
        </div>
      </form>
    {/snippet}
  </Modal>

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
</div>
