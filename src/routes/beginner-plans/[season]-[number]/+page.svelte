<script lang="ts">
    import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "$lib/components/ui/breadcrumb/index.js";
    import ModuleGroup from '$lib/components/module_group.svelte';

    let { data } = $props();
    const trainingPlan = data.training_plan!;
</script>

<Breadcrumb class="mx-8 mb-5">
    <BreadcrumbList>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbLink href="/beginner-plans">Beginner Training Plans</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{trainingPlan.season_text} Training {trainingPlan.training_number}</BreadcrumbPage>
    </BreadcrumbList>
</Breadcrumb>

<div class="flex flex-col gap-6 mx-8">
    <div>
        <div class="text-3xl font-bold mb-2">Beginners Training {trainingPlan.training_number}</div>
        <div class="text-xl font-semibold">{trainingPlan.date_text}</div>
    </div>
    <ModuleGroup modules={trainingPlan.module_objects} />
</div>
