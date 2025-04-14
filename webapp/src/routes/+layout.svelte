<script lang="ts">
    import '../app.css';
    
    let { children } = $props();
</script>

<div class="navbar bg-base-200 shadow-sm">
    <!-- Small screen dropdown menu for subpages. -->
    <div class="navbar-start">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><a href="/">Home</a></li>
                <li>
                    <a href="/beginners">Beginners</a>
                    <ul class="p-2">
                        <li><a href="/beginners">About</a></li>
                        <li><a href="/beginners/plans">Training Plans</a></li>
                        <li><a href="/beginners/modules">All Modules</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <!-- Large screen center links for subpages. -->
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 z-1">
            <li><a href="/">Home</a></li>
            <li>
                <div class="dropdown">
                    <div tabindex="0" role="button"class="btn-ghost lg:flex">Beginners</div>
                    <ul tabindex="-1" class="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-1 w-40 p-1 shadow">
                        <li><a href="/beginners">About</a></li>
                        <li><a href="/beginners/plans">Training Plans</a></li>
                        <li><a href="/beginners/modules">All Modules</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>

    <!-- Unused, but kept in for spacing. -->
    <div class="navbar-end"></div>
</div>

{@render children()}
