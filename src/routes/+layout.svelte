<script lang="ts">
  import '../app.css';
  import { HouseIcon, MenuIcon, XIcon, UserCircle } from '@lucide/svelte/icons';
  import { AppBar, Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
  import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from 'svelte-clerk';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import logo from '$lib/assets/ord-logo.svg';
  import NavLink from '$lib/components/nav_link.svelte';
  import { navGroups } from '$lib/nav';

  let { children } = $props();
  let drawerState = $state(false);

  afterNavigate(() => drawerState = false);

  function isActive(url: string): boolean {
    return page.url.pathname === url || page.url.pathname.startsWith(url + '/');
  }
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
            onOpenChange={e => drawerState = e.open}
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
                         sm:gap-6
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
                <div class="flex flex-col gap-3 sm:ml-4 mt-2 min-h-0">
                  <Dialog.CloseTrigger class="flex items-center gap-2 menu-hover w-min sm:-ml-2">
                    <XIcon size=24 />
                    <span class="text-lg">Close</span>
                  </Dialog.CloseTrigger>

                  <div class="flex
                              flex-col
                              gap-5
                              ml-4
                              sm:ml-2
                              overflow-y-auto
                              sm:pb-4
                              sm:[mask-image:linear-gradient(to_bottom,black_calc(100%_-_1rem),transparent)]">
                    <a class="flex items-center gap-2 w-fit strong-hover {isActive('/') ? 'text-[var(--strong-color-fg-on-dark)] font-semibold' : ''}" href="/">
                      <HouseIcon size=20 />
                      <div>Home</div>
                    </a>

                    {#each navGroups as group (group.header)}
                      <div class="flex flex-col gap-2">
                        <div class="text-lg font-semibold">{group.header}</div>
                        <div class="flex flex-col gap-2 ml-2">
                          {#each group.links as link (link.url)}
                            <NavLink
                                label={link.label}
                                url={link.url}
                                external={link.external ?? false}
                                active={isActive(link.url)}
                            />
                          {/each}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>

                <div class="flex shrink-0 ml-6 mb-8 max-sm:hidden">
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
