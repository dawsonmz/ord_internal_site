<script lang="ts">
    import '../app.css';
    import { afterNavigate } from '$app/navigation';
    import { AppBar, Modal } from '@skeletonlabs/skeleton-svelte';
    import logo from '$lib/assets/ord-logo.svg';
    
    let { children } = $props();
    let drawerState = $state(false);

    function closeDrawer() {
        drawerState = false;
    }

    afterNavigate(() => closeDrawer());
</script>

<AppBar base="mb-5" leadBase="place-self-center">
    {#snippet lead()}
        <Modal
            open={drawerState}
            onOpenChange={(e) => (drawerState = e.open)}
            triggerBase="btn group"
            contentBase="flex flex-col justify-between text-md bg-surface-100-900 p-4 space-y-4 shadow-xl w-screen sm:w-[400px] h-screen"
            positionerJustify="justify-start"
            positionerAlign=""
            positionerPadding=""
            transitionsPositionerIn={{ x: -400, duration: 300 }}
            transitionsPositionerOut={{ x: -400, duration: 300 }}
        >
            {#snippet trigger()}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current
                           group-hover:stroke-[var(--link-hover-color)]
                           group-active:stroke-[var(--link-active-color)]
                           w-6 h-6
                           sm:w-8 sm:h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M 4, 6 h 16
                           M 4,12 h 16
                           M 4,18 h 16"
                    />
                </svg>
            {/snippet}
            {#snippet content()}
                <div class="side-nav flex flex-col">
                    <img class="w-28 h-28 m-4" src={logo} alt="Oslo Roller Derby logo" />
                    <div>General</div>
                    <a class="link" href="/">Home</a>
                    <div>Teams</div>
                    <a class="link" href="#top"><em>Under Construction</em></a>
                    <div>Beginners</div>
                    <a class="link" href="/beginner-plans">Training Plans</a>
                    <a class="link" href="/beginner-modules">Modules</a>
                </div>
                <button type="button" class="place-self-start text-lg hover:text-[var(--link-hover-color)] m-5" aria-label="close menu" onclick={closeDrawer}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current inline-block w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M  4,4 L 20,20
                               M 20,4 L 4,20"
                        />
                    </svg>
                    Close
                </button>
            {/snippet}
        </Modal>
    {/snippet}
    {#snippet trail()}
        <a href="/"><img class="w-20 h-20" src={logo} alt="Oslo Roller Derby logo" /></a>
    {/snippet}
</AppBar>

{@render children()}
