<script lang="ts">
    let { baseClasses="", children } = $props();
</script>

<li class="inline-flex items-center gap-1.5 {baseClasses}">
    {@render children()}
</li>
