<script lang="ts">
    import '../app.css';
    import logo from '$lib/assets/ord-logo.svg';
    import { page } from '$app/state';
    
    let { children } = $props();
    const route = page.route.id;
</script>

<div class="flex justify-center font-bold text-lg">
    <div class="flex justify-center items-center relative size-40">
        <a class="{route === '/about' ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/about" data-sveltekit-reload>About Us</a>
    </div>
    <div class="flex justify-center items-center relative size-40">
        <a class="{route === '/beginners' ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/beginners" data-sveltekit-reload>Beginners</a>
    </div>
    <div class="flex justify-center items-center relative size-40 ml-5 mr-5">
        <a href="/" data-sveltekit-reload><img src={logo} width="140" height="140" alt="Oslo Roller Derby logo" /></a>
    </div>
    <div class="flex justify-center items-center relative size-40">
        <a class="{route?.startsWith('/beginners/plans') ?? false ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/beginners/plans" data-sveltekit-reload>Training Plans</a>
    </div>
    <div class="flex justify-center items-center relative size-40">
        <a class="{route === '/beginners/modules' ? 'text-blue-800' : 'text-blue-500'} hover:text-blue-300" href="/beginners/modules" data-sveltekit-reload>All Modules</a>
    </div>
</div>
<div class="divider"></div>

{@render children()}
