<script lang="ts">
  import { enhance } from '$app/forms';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import Dialog from '$lib/components/dialog.svelte';

  let { form, formId='default', formAction, openFn=null, trigger, header, formContent } = $props();
  let dialogState = $state(false);
  let submitting = $state(false);
</script>

<Dialog bind:dialogState {openFn} {trigger}>
  {#snippet content()}
    {@render header()}
    <form
        method="POST"
        action={formAction}
        use:enhance={
          () => {
            submitting = true;
            return async ({ update }) => {
              await update();
              submitting = false;
              if (form?.formId == formId && form?.success) {
                dialogState = false;
              }
            };
          }
        }
    >
      <input type="hidden" name="formId" value={formId} />
      {@render formContent()}
      <div class="flex gap-2 mt-4">
        <button type="submit" class="flex justify-center items-center w-[80px] h-[32px] text-sm p-2 button-style" formaction={formAction} disabled={submitting}>
          {#if submitting}
            <AnimatedDots />
          {:else}
            Submit
          {/if}
        </button>
        <button type="button" class="flex justify-center items-center w-[80px] h-[32px] text-sm p-2 button-style" onclick={() => dialogState = false}>
          Cancel
        </button>
      </div>
    </form>
  {/snippet}
</Dialog>
