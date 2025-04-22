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

<AppBar base="px-6 mb-5" leadBase="self-center flex h-[24px]">
    {#snippet lead()}
        <Modal
            open={drawerState}
            onOpenChange={(e) => (drawerState = e.open)}
            triggerBase="link flex items-center gap-3"
            contentBase="flex flex-col bg-surface-100-900 text-md p-6 space-y-4 shadow-2xl w-screen sm:w-[400px] h-screen"
            positionerJustify=""
            positionerAlign=""
            positionerPadding=""
            transitionsPositionerIn={{ x: -400, duration: 300 }}
            transitionsPositionerOut={{ x: -400, duration: 300 }}
        >
            {#snippet trigger()}
                <MenuIcon aria-label="open navigation menu" />
                <span class="text-lg font-semibold">Menu</span>
            {/snippet}
            {#snippet content()}
                <img class="self-center w-24 h-24" src={logo} alt="Oslo Roller Derby logo" />
                <div class="side-nav-header">General</div>
                <div class="side-nav-link"><a class="link" href="/">Home</a></div>
                <div class="side-nav-header">Teams</div>
                <div class="side-nav-link"><a class="link" href="#top"><em>Under Construction</em></a></div>
                <div class="side-nav-header">Beginners</div>
                <div class="side-nav-link"><a class="link" href="/beginner-plans">Training Plans</a></div>
                <div class="side-nav-link"><a class="link" href="/beginner-modules">Modules</a></div>

                <div class="mt-5">
                    <button type="button" class="link flex items-center gap-1" onclick={closeDrawer}>
                        <XIcon aria-label="close navigation menu"  />
                        <span class="text-lg font-semibold">Close</span>
                    </button>
                </div>
            {/snippet}
        </Modal>
    {/snippet}
    {#snippet trail()}
        <a href="/"><img class="w-20 h-20" src={logo} alt="Oslo Roller Derby logo" /></a>
    {/snippet}
</AppBar>

{@render children()}
