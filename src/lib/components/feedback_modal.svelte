<script lang="ts">
  import { MessageSquareShare } from '@lucide/svelte';
  import { Modal } from '@skeletonlabs/skeleton-svelte';
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import AnimatedCheck from '$lib/components/animated_check.svelte';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import Button from '$lib/components/button.svelte';

  let { baseClasses="", label="", iconSize=6, context=null, form, formId="default" } = $props();

  const currentPage = page.url.pathname === '/' ? 'home' : page.url.pathname;
  if (context == null) {
    context = `Current page: ${currentPage}`;
  }

  let modalState = $state(false);
  let submitting = $state(false);

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
    contentBase="rounded-md shadow-2xl w-screen sm:w-[480px] min-height main-style p-6"
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
    <form
        method="POST"
        action="?/feedback"
        use:enhance={
          () => {
            submitting = true;
            return async ({ update }) => {
              await update();
              submitting = false;
            };
          }
        }
    >
      <input type="hidden" name="formId" value={formId} />
      <label class="label mt-4">
        <span class="label-text text-base">Name or contact (optional):</span>
        <input type="text" name="contact" class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2" maxlength=128 />
      </label>

      <label class="label mt-4">
        <span class="label-text text-base mt-2">Regarding:</span>
        <div class="input text-sm py-2">{context}</div>
        <input type="hidden" name="context" value={context} />
      </label>

      <label class="label mt-2">
        <span class="label-text text-base">Comment:</span>
        {#if form?.formId === formId && form.errors?.text}
          <span class="text-sm font-semibold text-[var(--error-color)]">* {form.errors.text}</span>
        {/if}
        <textarea
            name="text"
            class="textarea resize-none text-sm bg-white dark:bg-[var(--dark-color)] py-2"
            rows=6
            maxlength=1024
        ></textarea>
      </label>
      <div class="flex gap-2 mt-4">
        <Button baseClasses="flex justify-center w-16 h-9" disabled={submitting}>
          {#if submitting}
            <AnimatedDots />
          {:else if form?.formId === formId && form?.success}
            <AnimatedCheck color="green" />
          {:else}
            Submit
          {/if}
        </Button>
        <Button baseClasses="w-16 h-9" clickAction={closeModal} justAButton>Cancel</Button>
      </div>
    </form>
  {/snippet}
</Modal>
