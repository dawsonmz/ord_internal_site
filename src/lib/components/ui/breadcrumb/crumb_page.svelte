<script lang="ts">
    import CrumbItem from './crumb_item.svelte';

    let { baseClasses="", children } = $props();
</script>

<CrumbItem baseClasses={baseClasses}>
    <span role="link" class="font-semibold" aria-disabled="true" aria-current="page">
        {@render children()}
    </span>
</CrumbItem>
