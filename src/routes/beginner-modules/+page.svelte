<script lang="ts">
    import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "$lib/components/ui/breadcrumb/index.js";
    import LinkCard from "$lib/components/ui/link_card.svelte";
    import LinkCardGrid from "$lib/components/ui/link_card_grid.svelte";

    let { data } = $props();
</script>

<Breadcrumb class="mx-8 mb-5">
    <BreadcrumbList>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbPage>Beginner Modules</BreadcrumbPage>
    </BreadcrumbList>
</Breadcrumb>

<LinkCardGrid header="Module Categories" baseClasses="mx-8">
    {#each data.module_categories as moduleCategory}
        <LinkCard
            title={moduleCategory.name}
            description={moduleCategory.description}
            url="/beginner-modules/{moduleCategory.short_text}"
        />
    {/each}
</LinkCardGrid>