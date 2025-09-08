<script lang="ts">
  import { Check, MessageSquareShare } from '@lucide/svelte';
  import { Modal } from '@skeletonlabs/skeleton-svelte';
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import Button from '$lib/components/button.svelte';

  let { baseClasses="", label="", iconSize=5, context=null, form, formId="default" } = $props();

  const currentPage = page.url.pathname === '/' ? 'home' : page.url.pathname;
  if (context == null) {
    context = `Current page: ${currentPage}`;
  }

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

<Modal
    open={modalState}
    onOpenChange={modalStateChange}
    base={baseClasses}
    triggerBase="flex items-center link gap-2"
    contentBase="shadow-2xl w-screen h-screen sm:w-[480px] sm:h-[520px] main-style p-6"
    positionerJustify="justify-center"
    positionerAlign="items-center"
>
  {#snippet trigger()}
    {#if label}<span>{label}</span>{/if}
    <MessageSquareShare class="size-{iconSize}" />
  {/snippet}
  {#snippet content()}
    <div class="text-lg font-semibold">Feedback</div>
    <div class="text-sm mt-2">
      Your input is appreciated! If you provide contact information, I can follow up for clarification or notify you of any updates.
    </div>
    <form method="POST" action="?/feedback" use:enhance>
      <input type="hidden" name="formId" value={formId} />
      <label class="label mt-4">
        <span class="label-text text-base">Name or contact (optional):</span>
        <input type="text" name="contact" class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2" maxlength=128 />
      </label>

      <label class="label mt-4">
        <span class="label-text text-base mt-2">Regarding:</span>
        <input type="text" name="context-display" class="input text-sm py-2" value={context} disabled />
        <input type="hidden" name="context" value={context} />
      </label>

      <label class="label mt-2">
        <span class="label-text text-base">Comment:</span>
        <textarea
            name="text"
            class="textarea resize-none text-sm bg-white dark:bg-[var(--dark-color)] py-2"
            rows=6
            maxlength=1024
            required
        ></textarea>
      </label>
      <div class="flex gap-2 mt-4">
        <Button>Submit</Button>
        <Button clickAction={closeModal} justAButton>Cancel</Button>
        {#if form?.formId === formId && form?.success}
          <Check class="self-center size-7" color="green" />
          <span class="self-center text-sm font-semibold italic text-[var(--hover-color)]">
            Feedback submitted!
          </span>
        {/if}
      </div>
    </form>
  {/snippet}
</Modal>
