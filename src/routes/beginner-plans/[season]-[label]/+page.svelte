<script lang="ts">
    import ModuleGroup from '$lib/components/module_group.svelte';
    import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/ui/breadcrumb/index.js';

    let { data } = $props();
    const trainingPlan = data.training_plan!;
</script>

<Crumb baseClasses="mx-8 mb-5">
    <CrumbHome />
    <CrumbSeparator />
    <CrumbLink href="/beginner-plans">Beginner Plans</CrumbLink>
    <CrumbSeparator />
    <CrumbPage>{trainingPlan.season_text} - {trainingPlan.training_label}</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 mx-8">
    <div>
        <div class="text-2xl mb-2">Beginners Training {trainingPlan.training_label}</div>
        <div class="text-lg">{trainingPlan.date_text}</div>
    </div>
    <ModuleGroup modules={trainingPlan.module_objects} />
</div>
