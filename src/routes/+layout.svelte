<script lang="ts">
  import '../app.css';
  import { afterNavigate } from '$app/navigation';
  import { MenuIcon, XIcon, ExternalLink } from '@lucide/svelte';
  import { AppBar, Modal } from '@skeletonlabs/skeleton-svelte';
  import logo from '$lib/assets/ord-logo.svg';
  import FeedbackModal from '$lib/components/feedback_modal.svelte';
  
  let { children } = $props();
  let drawerState = $state(false);

  function closeDrawer() {
    drawerState = false;
  }

  afterNavigate(() => closeDrawer());
</script>

<AppBar base="px-6 mb-5" background="menu-colors" leadBase="self-center flex h-[24px]">
  {#snippet lead()}
    <Modal
        open={drawerState}
        onOpenChange={(e) => (drawerState = e.open)}
        triggerBase="flex items-center gap-3 link"
        contentBase="menu-colors flex flex-col justify-between shadow-2xl w-screen sm:w-[400px] h-screen p-6"
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
                class="flex items-center gap-1 link"
                onclick={closeDrawer}
            >
              <XIcon aria-label="close navigation menu" />
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
          <img class="w-24 h-24" src={logo} alt="Oslo Roller Derby logo" />
          <FeedbackModal baseClasses="self-center text-sm ml-5" label="Submit feedback here!" iconClasses="size-5" />
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
