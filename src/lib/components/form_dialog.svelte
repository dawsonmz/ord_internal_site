<script lang="ts">
  import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
  import { enhance } from '$app/forms';
  import AnimatedCheck from '$lib/components/animated_check.svelte';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import Button from '$lib/components/button.svelte';

  let { wrapperClasses="", form, formId="default", formAction, closeFn, trigger, header, formContent } = $props();

  let dialogState = $state(false);
  let submitting = $state(false);

  function closeDialog() {
    dialogState = false;
    form = null;
    closeFn();
  }

  function dialogStateChange(e: any) {
    if (e.open) {
      dialogState = true;
    } else {
      closeDialog();
    }
  }
</script>

<!-- Wrapper div is needed for flex layouts to prevent the trigger component from spanning maximum width. -->
<div class={wrapperClasses}>
  <Dialog open={dialogState} onOpenChange={dialogStateChange}>
    <Dialog.Trigger>
      {@render trigger()}
    </Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop
          class="fixed
                inset-0
                bg-[var(--faded-backdrop-color)]
                transition
                transition-discrete
                duration-200
                starting:data-[state=open]:opacity-0
                data-[state=open]:opacity-100"
      />
      <Dialog.Positioner class="fixed inset-0 flex justify-center items-center">
        <Dialog.Content
            class="rounded-md
                  shadow-2xl
                  w-screen
                  sm:w-[480px]
                  min-height
                  main-style
                  dark:border-[1px]
                  p-6
                  transition
                  transition-discrete
                  duration-200
                  starting:data-[state=open]:opacity-0
                  starting:data-[state=open]:translate-y-15
                  data-[state=open]:opacity-100
                  data-[state=open]:translate-y-0"
        >
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
                  };
                }
              }
          >
            <input type="hidden" name="formId" value={formId} />
            {@render formContent()}
            <div class="flex gap-2 mt-4">
              <Button baseClasses="flex justify-center items-center w-18 h-9" disabled={submitting}>
                {#if submitting}
                  <AnimatedDots />
                {:else if form?.formId === formId && form?.success}
                  <AnimatedCheck color="green" />
                {:else}
                  Submit
                {/if}
              </Button>
              <Button baseClasses="flex justify-center items-center w-18 h-9" clickAction={closeDialog} justAButton>Cancel</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog>
</div>
