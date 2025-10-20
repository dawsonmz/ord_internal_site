<script lang="ts">
  import '../app.css';
  import { MenuIcon, XIcon, ExternalLink } from '@lucide/svelte';
  import { AppBar, Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import logo from '$lib/assets/ord-logo.svg';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  
  let { children } = $props();
  let drawerState = $state(false);
  let form = $derived(page.form);

  function closeDrawer() {
    drawerState = false;
  }

  afterNavigate(() => closeDrawer());
</script>

<AppBar>
  <AppBar.Toolbar class="menu-colors flex justify-between items-center px-6 py-2 mb-5">
    <AppBar.Lead class="h-[24px]">
      <Dialog open={drawerState} onOpenChange={e => drawerState = e.open}>
        <Dialog.Trigger class="flex items-center gap-3 link">
          <MenuIcon aria-label="open navigation menu" />
          <span class="text-lg">Menu</span>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop
              class="fixed
                     inset-0
                     bg-faded
                     transition
                     transition-discrete
                     duration-200
                     starting:data-[state=open]:opacity-0
                     data-[state=open]:opacity-100"
          />
          <Dialog.Positioner class="fixed inset-0">
            <Dialog.Content
                class="menu-colors
                       sm:dark:border-r-[1px]
                       flex
                       flex-col
                       justify-between
                       w-screen
                       sm:w-[400px]
                       h-screen
                       p-6
                       transition
                       transition-discrete
                       duration-200
                       starting:data-[state=open]:opacity-0
                       starting:data-[state=open]:-translate-x-full
                       data-[state=open]:opacity-100
                       data-[state=open]:translate-x-0"
            >
              <div class="flex flex-col gap-4">
                <Dialog.CloseTrigger class="mt-5 mb-8">
                  <button type="button" class="flex items-center gap-1 link">
                    <XIcon aria-label="close navigation menu" />
                    <span class="text-lg">Close</span>
                  </button>
                </Dialog.CloseTrigger>

                <div class="font-semibold text-xl">General</div>
                <div class="mx-5"><a class="link" href="/">Home</a></div>

                <div class="font-semibold text-xl">Team Resources</div>
                <div class="mx-5"><a class="link" href="/roster-a-team">A Team Roster</a></div>
                <div class="mx-5"><a class="link" href="/roster-b-team">B Team Roster</a></div>
                <div class="mx-5"><a class="link" href="/skater-vault">Skater Vault</a></div>

                <div class="font-semibold text-xl">Beginners</div>
                <div class="mx-5"><a class="link" href="/beginner-plans">Training Plans</a></div>
                <div class="mx-5"><a class="link" href="/beginner-modules">Modules</a></div>
                <div class="mx-5"><a class="link" href="/beginner-skills">Skills Tracking</a></div>

                <div class="font-semibold text-xl">Other Resources</div>
                <div class="mx-5">
                  <a class="flex link justify-items-center" href="https://portal.mittvarsel.no/skjema/norges-idrettsforbund/SNPZOBQpD7CUt9Er.1532" target="_blank">
                    <span class="mr-1">Mitt Varsel</span>
                    <ExternalLink class="inline size-5" />
                  </a>
                </div>
              </div>
              <div class="flex mb-5">
                <img class="w-16 h-16 sm:w-24 sm:h-24" src={logo} alt="Oslo Roller Derby logo" />
                <FeedbackDialog label="Feedback?" labelClasses="text-sm" wrapperClasses="self-center ml-5" iconSize={5} form={form} formId="sidebar" />
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog>
    </AppBar.Lead>
    <AppBar.Trail>
      <a href="/" class="invisible sm:visible">
        <img class="w-16 h-16 sm:w-24 sm:h-24" src={logo} alt="Oslo Roller Derby logo" />
      </a>
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>

{@render children()}

<footer class="mt-20"></footer>
