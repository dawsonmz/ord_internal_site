<script lang="ts">
  import '../app.css';
  import { MenuIcon, XIcon, ExternalLink, UserCircle } from '@lucide/svelte/icons';
  import { AppBar, Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
  import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from 'svelte-clerk';
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

<ClerkProvider
    appearance={{
      variables: {
        colorPrimary: 'var(--semi-light-color)',
        colorPrimaryForeground: 'var(--dark-color)',
        colorForeground: 'var(--very-light-color)',
        colorBackground: 'var(--dark-color)',
        colorInput: 'var(--very-light-color)',
        colorInputForeground: 'var(--dark-color)',
        colorModalBackdrop: 'var(--faded-backdrop-color)',
        colorMuted: 'var(--menu-dark-color)',
        colorNeutral: 'var(--light-color)',
        colorDanger: 'var(--error-color)',
        fontSize: '1.0rem',
        borderRadius: '0.25rem',
      },
      layout: {
        shimmer: false,
      },
    }}
>
  <AppBar>
    <AppBar.Toolbar class="menu-colors flex justify-between px-4 sm:px-8 py-2">
      <AppBar.Lead class="flex items-center">
        <Dialog open={drawerState} onOpenChange={e => drawerState = e.open}>
          <Dialog.Trigger class="flex items-center gap-2 menu-hover">
            <MenuIcon aria-label="open navigation menu" />
            <span class="text-lg">Menu</span>
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
            <Dialog.Positioner class="fixed inset-0">
              <Dialog.Content
                  class="menu-colors
                         flex
                         flex-col
                         sm:justify-between
                         w-screen
                         sm:w-[400px]
                         h-screen
                         px-4
                         py-2
                         sm:py-6
                         transition
                         transition-discrete
                         duration-200
                         starting:data-[state=open]:opacity-0
                         starting:data-[state=open]:-translate-x-full
                         data-[state=open]:opacity-100
                         data-[state=open]:translate-x-0"
              >
                <div class="flex flex-col gap-4 sm:ml-4 mt-2">
                  <!-- Wrapper div around CloseTrigger is needed to prevent it from spanning the entire width. -->
                  <div>
                    <Dialog.CloseTrigger class="flex items-center gap-1 menu-hover">
                      <XIcon aria-label="close navigation menu" />
                      <span class="text-lg">Close</span>
                    </Dialog.CloseTrigger>
                  </div>

                  <div class="flex flex-col gap-4 ml-4 sm:ml-2">
                    <div class="font-semibold text-xl">General</div>
                    <div class="ml-6"><a class="link" href="/">Home</a></div>

                    <div class="font-semibold text-xl">Team Resources</div>
                    <div class="ml-6"><a class="link" href="/roster-a-team">A Team Roster</a></div>
                    <div class="ml-6"><a class="link" href="/roster-b-team">B Team Roster</a></div>
                    <div class="ml-6"><a class="link" href="/skater-vault">Skater Vault</a></div>

                    <div class="font-semibold text-xl">Beginners</div>
                    <div class="ml-6"><a class="link" href="/beginner-plans">Training Plans</a></div>
                    <div class="ml-6"><a class="link" href="/beginner-modules">Modules</a></div>
                    <div class="ml-6"><a class="link" href="/beginner-skills">Skills Tracking</a></div>

                    <div class="font-semibold text-xl">Other Resources</div>
                    <div class="ml-6">
                      <a class="flex link justify-items-center" href="https://portal.mittvarsel.no/skjema/norges-idrettsforbund/SNPZOBQpD7CUt9Er.1532" target="_blank">
                        <ExternalLink class="inline size-5 mr-1" />
                        <span>Mitt Varsel</span>
                      </a>
                    </div>
                    <div>
                      <FeedbackDialog label="Give Feedback" labelClasses="font-semibold text-xl" wrapperClasses="self-center" iconSize={24} form={form} formId="sidebar" />
                    </div>
                  </div>  
                </div>

                <div class="flex ml-6 mb-8 max-sm:hidden">
                  <img class="w-32 h-32" src={logo} alt="Oslo Roller Derby logo" />
                </div>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog>
      </AppBar.Lead>
      <AppBar.Headline>
        <a href="/" class="invisible sm:visible">
          <img class="w-16 h-16 sm:w-24 sm:h-24" src={logo} alt="Oslo Roller Derby logo" />
        </a>
      </AppBar.Headline>
      <AppBar.Trail class="flex items-center">
        <SignedIn>
          <UserButton
              appearance={{
                variables: {
                  // Faint ring around avatar image when selected. It doesn't seem like it can be turned off,
                  // so instead we set it to the same color as the app bar.
                  colorRing: 'var(--menu-dark-color)',
                },
                elements: {
                  userButtonBox: 'w-[52px] h-[52px] menu-hover',
                },
              }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <div class="w-[52px] h-[52px] menu-hover">
              <UserCircle size=28 />
            </div>
          </SignInButton>
        </SignedOut>
      </AppBar.Trail>
    </AppBar.Toolbar>
  </AppBar>

  <div class="flex flex-col gap-4 mx-8 mt-5">
    {@render children()}
  </div>
  <footer class="mt-20"></footer>
</ClerkProvider>
