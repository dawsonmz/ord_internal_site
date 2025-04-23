<script lang="ts">
    import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "$lib/components/ui/breadcrumb/index.js";
    import ModuleGroup from '$lib/components/module_group.svelte';

    let { data } = $props();
    const modules = data.modules!;
    const category = modules[0].module_category.name;
</script>

<Breadcrumb class="mx-8 mb-5">
    <BreadcrumbList>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbLink href="/beginner-modules">Beginner Modules</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{category}</BreadcrumbPage>
    </BreadcrumbList>
</Breadcrumb>

<div class="flex flex-col gap-6 mx-8">
    <div class="text-3xl font-semibold">Category: {category}</div>
    <ModuleGroup modules={data.modules} />
</div>
