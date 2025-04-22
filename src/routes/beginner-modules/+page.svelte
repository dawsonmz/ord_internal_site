<script lang="ts">
    let { data } = $props();
</script>

<div class="flex flex-col gap-10 items-center">
    <div class="text-3xl font-semibold">Module Categories</div>
    <div class="link-card-grid">
        {#each data.module_categories as moduleCategory}
            <a href="/beginner-modules/{moduleCategory.short_text}" class="link-card">
                <div class="text-2xl font-semibold mb-2">{moduleCategory.name}</div>
                <div>{moduleCategory.description}</div>
            </a>
        {/each}
    </div>
</div>
