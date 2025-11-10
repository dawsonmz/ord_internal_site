<script lang="ts">
  import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

  let { dialogState=$bindable(), openFn=null, closeFn=null, trigger, content } = $props();

  function openDialog() {
    dialogState = true;
    if (openFn) {
      openFn();
    }
  }

  function closeDialog() {
    dialogState = false;
    if (closeFn) {
      closeFn();
    }
  }

  function dialogStateChange(e: any) {
    if (e.open) {
      openDialog();
    } else {
      closeDialog();
    }
  }
</script>

<Dialog open={dialogState} onOpenChange={dialogStateChange}>
  <Dialog.Trigger class="w-fit">
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
        {@render content()}
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
