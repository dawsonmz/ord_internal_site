<script lang="ts">
    let { baseClasses="", children } = $props();
</script>

<nav class={baseClasses} aria-label="breadcrumb">
    <ol class="text-muted-foreground flex flex-wrap items-center text-sm break-words gap-1.5 sm:gap-2.5">
        {@render children()}
    </ol>
</nav>
