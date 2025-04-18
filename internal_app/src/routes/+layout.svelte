<script lang="ts">
    import '../app.css';
    import logo from '$lib/assets/ord-logo.svg';
    import { page } from '$app/state';
    
    let { children } = $props();
    const route = page.route.id;
</script>

<div class="drawer">
    <input id="nav-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
        <div class="flex justify-center border-b-1 border-gray-300 font-bold text-lg pb-2 my-2">
            <!-- Hamburger menu with side-drawer for navigation on small screens. Logo still shows. -->
            <div class="flex md:hidden items-center mx-2">
                <label for="nav-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M 4,6  h 16
                                M 4,12 h 16
                                M 4,18 h 16" />
                    </svg>
                </label>
            </div>

            <!-- Normal navigation on medium or larger screens. -->
            <div class="flex max-md:hidden justify-center items-center relative size-40">
                <a class="{route === '/about' ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/about" data-sveltekit-reload>About Us</a>
            </div>
            <div class="flex max-md:hidden justify-center items-center relative size-40">
                <a class="{route === '/beginners' ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/beginners" data-sveltekit-reload>Beginners</a>
            </div>
            <div class="flex max-md:grow justify-center items-center relative size-40 max-md:size-20 ml-5 mr-5">
                <a href="/" data-sveltekit-reload><img class="w-140 h-140 max-md:w-20 max-md:h-20" src={logo} alt="Oslo Roller Derby logo" /></a>
            </div>
            <div class="flex max-md:hidden justify-center items-center relative size-40">
                <a class="{route?.startsWith('/beginners/plans') ?? false ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/beginners/plans" data-sveltekit-reload>Training Plans</a>
            </div>
            <div class="flex max-md:hidden justify-center items-center relative size-40">
                <a class="{route === '/beginners/modules' ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/beginners/modules" data-sveltekit-reload>All Modules</a>
            </div>

            <!-- For symmetric spacing with the dropdown menu on the left side on small screens. -->
            <div class="flex md:hidden h-8 w-8 mx-2"></div>
        </div>
    </div>

    <!-- Side-drawer content. -->
    <div class="drawer-side z-50">
        <label for="nav-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 min-h-full w-60 p-4">
            <li><a href="/about" data-sveltekit-reload>About Us</a></li>
            <li><a href="/beginners" data-sveltekit-reload>Beginners</a></li>
            <li><a href="/beginners/plans" data-sveltekit-reload>Training Plans</a></li>
            <li><a href="/beginners/modules" data-sveltekit-reload>All Modules</a></li>
        </ul>
    </div>
</div>

{@render children()}
