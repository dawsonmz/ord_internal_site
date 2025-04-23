<script lang="ts">
    import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/ui/breadcrumb/index.js';
    import HouseIcon from '@lucide/svelte/icons/house';
    import ModuleGroup from '$lib/components/module_group.svelte';

    let { data } = $props();
    const trainingPlan = data.training_plan!;
</script>

<Crumb baseClasses="mx-8 mb-5">
    <CrumbHome />
    <CrumbSeparator />
    <CrumbLink href="/beginner-plans">Beginner Plans</CrumbLink>
    <CrumbSeparator />
    <CrumbPage>{trainingPlan.season_text} - {trainingPlan.training_number}</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 mx-8">
    <div>
        <div class="text-3xl font-bold mb-2">Beginners Training {trainingPlan.training_number}</div>
        <div class="text-xl font-semibold">{trainingPlan.date_text}</div>
    </div>
    <ModuleGroup modules={trainingPlan.module_objects} />
</div>
