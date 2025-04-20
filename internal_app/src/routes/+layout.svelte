<script lang="ts">
    import '../app.css';
    import { afterNavigate } from '$app/navigation';
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import logo from '$lib/assets/ord-logo.svg';
    
    let { children } = $props();
    let drawerState = $state(false);

    function closeDrawer() {
        drawerState = false;
    }

    afterNavigate(() => closeDrawer());
</script>

<div class="flex justify-center font-bold text-lg pb-2 my-2">
    <div class="flex items-center mx-2 sm:mx-5">
        <!-- Hamburger menu which opens the side drawer. -->
        <Modal
            open={drawerState}
            onOpenChange={(e) => (drawerState = e.open)}
            triggerBase="btn group"
            contentBase="bg-surface-100-900 p-4 space-y-4 shadow-xl w-[360px] h-screen"
            positionerJustify="justify-start"
            positionerAlign=""
            positionerPadding=""
            transitionsPositionerIn={{ x: -360, duration: 300 }}
            transitionsPositionerOut={{ x: -360, duration: 300 }}
        >
            {#snippet trigger()}
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current group-hover:stroke-secondary-500 w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24">
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
                <ul class="font-semibold min-h-full p-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/beginner-plans">Beginner Training Plans</a></li>
                    <li><a href="/beginner-modules">All Beginner Modules</a></li>
                    <li>
                        <button type="button" aria-label="close menu" onclick={closeDrawer}>
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
                    </li>
                </ul>
            {/snippet}
        </Modal>
    </div>

    <!-- ORD logo. -->
    <div class="flex grow justify-center items-center relative size-25 sm:size-32 ml-5 mr-5">
        <a href="/"><img class="w-25 h-25 sm:w-32 sm:h-32" src={logo} alt="Oslo Roller Derby logo" /></a>
    </div>

    <!-- Hidden div for symmetric placement. -->
    <div class="flex w-10 h-10 mx-2 sm:mx-5"></div>
</div>

{@render children()}
