<script lang="ts">
  import { MessageSquareShare } from '@lucide/svelte';
  import { Modal } from '@skeletonlabs/skeleton-svelte';
  import Button from '$lib/components/button.svelte';

  let { label="", form } = $props();
  let modalState = $derived(form?.success);

  function closeModal() {
    modalState = false;
  }
</script>

<Modal
      open={modalState}
      onOpenChange={(e) => (modalState = e.open)}
      triggerBase="flex items-center link"
      contentBase="shadow-2xl w-screen h-screen sm:w-[480px] sm:h-[528px] main-style p-6"
      positionerJustify="justify-center"
      positionerAlign="items-center"
>
  {#snippet trigger()}
    {#if label}<span class="text-lg mr-2">{label}</span>{/if}
    <MessageSquareShare />
  {/snippet}
  {#snippet content()}
    <div class="text-lg font-semibold">Feedback</div>
    <div class="text-sm mt-2">
      Your input is appreciated! If you provide contact information, I can follow up for clarification or notify you of any updates.
    </div>
    <form method="POST" action="?/feedback">
      <label class="label mt-4">
        <span class="label-text text-base">Name or contact (optional):</span>
        <input type="text" name="contact" class="input bg-white dark:bg-[var(--dark-color)] py-2" maxlength=128 />
      </label>
      <label class="label mt-2">
        <span class="label-text text-base">Regarding:</span>
        <select name="context" class="select bg-white dark:bg-[var(--dark-color)] py-2">
          <option value="1" selected>Current page</option>
          <option value="2">Value 2</option>
          <option value="3">Value 3</option>
          <option value="4">Anything else</option>
        </select>
      </label>
      <label class="label mt-2">
        <span class="label-text text-base">Comment:</span>
        <textarea name="text" class="textarea resize-none bg-white dark:bg-[var(--dark-color)] py-2" rows=6 maxlength=1024 required></textarea>
      </label>
      <div class="flex gap-4 mt-4">
        <Button>Submit</Button>
        <Button clickAction={closeModal} justAButton>Cancel</Button>
        {#if form?.success}
          <span class="self-center text-sm font-semibold italic text-[var(--hover-color)]">
            Feedback submitted!
          </span>
        {/if}
      </div>
    </form>
  {/snippet}
</Modal>
