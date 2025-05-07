<script lang="ts">
  import '../app.css';
  import { afterNavigate } from '$app/navigation';
  import { MenuIcon, XIcon } from '@lucide/svelte';
  import { AppBar, Modal } from '@skeletonlabs/skeleton-svelte';
  import logo from '$lib/assets/ord-logo.svg';
  
  let { children } = $props();
  let drawerState = $state(false);

  function closeDrawer() {
    drawerState = false;
  }

  afterNavigate(() => closeDrawer());
</script>

<AppBar base="bg-tertiary-50-950 px-6 mb-5" leadBase="self-center flex h-[24px]">
  {#snippet lead()}
    <Modal
        open={drawerState}
        onOpenChange={(e) => (drawerState = e.open)}
        triggerBase="flex items-center gap-3 hover:text-[var(--link-hover-color)] active:text-[var(--link-active-color)]"
        contentBase="flex flex-col justify-between bg-tertiary-50-950 shadow-2xl w-screen sm:w-[400px] h-screen p-6"
        positionerJustify=""
        positionerAlign=""
        positionerPadding=""
        transitionsPositionerIn={{ x: -400, duration: 300 }}
        transitionsPositionerOut={{ x: -400, duration: 300 }}
    >
      {#snippet trigger()}
        <MenuIcon aria-label="open navigation menu" />
        <span class="text-lg">Menu</span>
      {/snippet}
      {#snippet content()}
        <div class="flex flex-col gap-4">
          <div class="mt-5 mb-8">
            <button
                type="button"
                class="flex items-center gap-1 hover:text-[var(--link-hover-color)] active:text-[var(--link-active-color)]"
                onclick={closeDrawer}
            >
              <XIcon aria-label="close navigation menu"  />
              <span class="text-lg">Close</span>
            </button>
          </div>

          <div class="font-semibold text-xl">General</div>
          <div class="mx-5"><a class="link" href="/">Home</a></div>

          <div class="font-semibold text-xl">Team Resources</div>
          <div class="mx-5"><a class="link" href="/skater-vault">Skater Vault</a></div>

          <div class="font-semibold text-xl">Beginners</div>
          <div class="mx-5"><a class="link" href="/beginner-plans">Training Plans</a></div>
          <div class="mx-5"><a class="link" href="/beginner-modules">Modules</a></div>
        </div>
        <div class="flex mb-5">
          <img class="w-24 h-24" src={logo} alt="Oslo Roller Derby logo" />
          <span class="self-center ml-5">
            Questions or feedback?<br />Contact Creek!
          </span>
        </div>
      {/snippet}
    </Modal>
  {/snippet}
  {#snippet trail()}
    <a href="/"><img class="w-20 h-20" src={logo} alt="Oslo Roller Derby logo" /></a>
  {/snippet}
</AppBar>

{@render children()}

<footer class="mt-20"></footer>
