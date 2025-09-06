<script lang="ts">
  import { Check, MessageSquareShare } from '@lucide/svelte';
  import { Modal } from '@skeletonlabs/skeleton-svelte';
  import Button from '$lib/components/button.svelte';
  import { page } from '$app/state';

  let { baseClasses="", label="", iconClasses="size-6", form, context=null } = $props();

  let commentText = $state('');
  let modalState = $state(false);
  let showSubmitCheck = $state(false);

  const currentPage = page.url.pathname === '/' ? 'home' : page.url.pathname;
  if (context == null) {
    context = `Current page: ${currentPage}`;
  }

  function updateStateForSubmit() {
    if (commentText.length > 0) {
      showSubmitCheck = true;
    }
  }

  function closeModal() {
    modalState = false;
    showSubmitCheck = false;
  }

  function modalOpenChange(e: any) {
    modalState = e.open;
    showSubmitCheck = false;
  }
</script>

<Modal
      open={modalState}
      onOpenChange={modalOpenChange}
      base={baseClasses}
      triggerBase="flex items-center link"
      contentBase="shadow-2xl w-screen h-screen sm:w-[480px] sm:h-[528px] main-style p-6"
      positionerJustify="justify-center"
      positionerAlign="items-center"
>
  {#snippet trigger()}
    {#if label}<span class="mr-2">{label}</span>{/if}
    <MessageSquareShare class={iconClasses} />
  {/snippet}
  {#snippet content()}
    <div class="text-lg font-semibold">Feedback</div>
    <div class="text-sm mt-2">
      Your input is appreciated! If you provide contact information, I can follow up for clarification or notify you of any updates.
    </div>
    <form method="POST" action="?/feedback">
      <label class="label mt-4">
        <span class="label-text text-base">Name or contact (optional):</span>
        <input type="text" name="contact" class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2" maxlength=128 />
      </label>

      <label class="label mt-4">
        <span class="label-text text-base mt-2">Regarding: </span>
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
            bind:value={commentText}
            required></textarea>
      </label>
      <div class="flex gap-4 mt-4">
        <Button clickAction={updateStateForSubmit}>Submit</Button>
        <Button clickAction={closeModal} justAButton>Cancel</Button>
        {#if showSubmitCheck}
          <Check class="self-center size-8" color="green" />
        {/if}
      </div>
    </form>
  {/snippet}
</Modal>
