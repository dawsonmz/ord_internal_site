<script lang="ts">
    import ModuleGroup from '$lib/components/module_group.svelte';

    let { data } = $props();
</script>

<div class="flex flex-col gap-6 mx-5 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60">
    <div class="text-3xl font-semibold">Category: {data.modules![0].module_category.name}</div>
    <ModuleGroup modules={data.modules} />
</div>
