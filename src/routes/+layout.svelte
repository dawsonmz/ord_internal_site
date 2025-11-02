<script lang="ts">
  import '../app.css';
  import { HouseIcon, MenuIcon, XIcon, LogIn, LogOut, UserCircle } from '@lucide/svelte/icons';
  import { Accordion, AppBar, Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
  import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from 'svelte-clerk';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import logo from '$lib/assets/ord-logo.svg';
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import NavAccordionItem from '$lib/components/nav_accordion_item.svelte';
  import NavAccordionLink from '$lib/components/nav_accordion_link.svelte';
  
  let { children } = $props();
  let drawerState = $state(false);
  let openNavItems: string[] = $state([]);
  let form = $derived(page.form);

  function closeDrawer() {
    drawerState = false;
    openNavItems = [];
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
    <AppBar.Toolbar class="menu-colors flex justify-between px-4 py-2">
      <AppBar.Lead class="flex items-center">
        <Dialog
            open={drawerState}
            onOpenChange={e => {
              drawerState = e.open;
              openNavItems = [];
            }}
        >
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
                <div class="flex flex-col gap-3 sm:ml-4 mt-2">
                  <Dialog.CloseTrigger class="flex items-center gap-2 menu-hover w-min sm:-ml-2">
                    <XIcon size=24 />
                    <span class="text-lg">Close</span>
                  </Dialog.CloseTrigger>

                  <div class="flex flex-col gap-6 ml-4 sm:ml-2">
                    <div class="flex flex-col gap-3">
                      <a class="flex items-center gap-2 link" href="/">
                        <HouseIcon size=20 />
                        <div>Home</div>
                      </a>
                      <SignedIn>
                        <SignOutButton class="flex items-center gap-2 link">
                          <LogOut size=20 />
                          <div>Sign Out</div>
                        </SignOutButton>
                      </SignedIn>
                      <SignedOut>
                        <SignInButton class="flex items-center gap-2 link">
                          <LogIn size=20 />
                          <div>Sign In</div>
                        </SignInButton>
                      </SignedOut>
                    </div>

                    <Accordion value={openNavItems} collapsible onValueChange={e => openNavItems = e.value}>
                      <NavAccordionItem header="Team Resources" {openNavItems}>
                        <NavAccordionLink label="A Team Roster" url="/roster-a-team" />
                        <NavAccordionLink label="B Team Roster" url="/roster-b-team" />
                        <NavAccordionLink label="Document Links" url="/documents" />
                      </NavAccordionItem>
                      <NavAccordionItem header="Training Resources" {openNavItems}>
                        <NavAccordionLink label="Footage" url="/footage" />
                      </NavAccordionItem>
                      <NavAccordionItem header="Skater Resources" {openNavItems}>
                        <NavAccordionLink label="Skater Vault" url="/skater-vault" />
                      </NavAccordionItem>
                      <NavAccordionItem header="Beginners" {openNavItems}>
                        <NavAccordionLink label="Training Plans" url="/beginner-plans" />
                        <NavAccordionLink label="Modules" url="/beginner-modules" />
                        <NavAccordionLink label="Skills Tracking" url="/beginner-skills" />
                      </NavAccordionItem>
                      <NavAccordionItem header="Other Resources" {openNavItems}>
                        <NavAccordionLink label="Mitt Varsel" url="https://portal.mittvarsel.no/skjema/norges-idrettsforbund/SNPZOBQpD7CUt9Er.1532" external />
                        <NavAccordionLink label="WFTDA Rankings" url="https://stats.wftda.com/rankings-live/europe" external />
                      </NavAccordionItem>
                    </Accordion>
                    
                    <div>
                      <FeedbackDialog label="Give Feedback" labelClasses="font-semibold text-lg" wrapperClasses="self-center" iconSize={24} form={form} formId="sidebar" />
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
      <AppBar.Trail class="flex items-center pl-14">
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

  <div class="w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] flex flex-col gap-4 px-6 sm:mx-auto mt-5 mb-20">
    {@render children()}
  </div>
</ClerkProvider>
