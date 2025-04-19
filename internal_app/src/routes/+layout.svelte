<script lang="ts">
    import '../app.css';
    import { afterNavigate } from '$app/navigation';
    import logo from '$lib/assets/ord-logo.svg';
    
    let { children } = $props();
    let drawerChecked = $state(false);

    function closeSideDrawer() {
        drawerChecked = false;
    }

    function onKeyUp(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeSideDrawer();
        }
    }

    afterNavigate(() => closeSideDrawer());
</script>
<svelte:window on:keyup={onKeyUp} />

<div class="drawer bg-base z-1">
    <input id="nav-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerChecked} />
    <div class="drawer-content flex flex-col">
        <div class="flex justify-center font-bold text-lg pb-2 my-2">
            <!-- Hamburger menu for navigation. -->
            <div class="flex items-center mx-2 sm:mx-5">
                <label for="nav-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost m-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M 4, 6 h 16
                               M 4,12 h 16
                               M 4,18 h 16" />
                    </svg>
                </label>
            </div>

            <!-- ORD logo. -->
            <div class="flex grow justify-center items-center relative size-25 sm:size-32 ml-5 mr-5">
                <a href="/"><img class="w-25 h-25 sm:w-32 sm:h-32" src={logo} alt="Oslo Roller Derby logo" /></a>
            </div>

            <!-- Hidden div for symmetric placement. -->
            <div class="flex w-10 h-10 mx-2 sm:mx-5"></div>
        </div>
    </div>

    <!-- Navigation side-drawer content. -->
    <div class="drawer-side">
        <label for="nav-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-100 font-semibold min-h-full w-60 p-4">
            <li><a href="/">Home</a></li>
            <li><a href="/beginner-plans">Beginner Training Plans</a></li>
            <li><a href="/beginner-modules">All Beginner Modules</a></li>
            <li>
                <button tabindex="0" aria-label="close menu" onclick={closeSideDrawer}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M  4,4 L 20,20
                                 M 20,4 L 4,20" />
                    </svg>
                    Close
                </button>
            </li>
        </ul>
    </div>
</div>

{@render children()}
