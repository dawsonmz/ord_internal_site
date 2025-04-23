<script lang="ts">
    let { header="", baseClasses="", children } = $props();
</script>

<div class="flex flex-col gap-6 {baseClasses}">
    <div class="text-2xl">{header}</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {@render children()}
    </div>
</div>