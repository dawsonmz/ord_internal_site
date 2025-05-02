<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from "$lib/components/breadcrumb/index.js";
  import ModuleGroup from '$lib/components/module_group.svelte';

  let { data } = $props();
  const modules = data.modules!;
  const category = modules[0].module_category.name;
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-modules">Beginner Modules</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{category}</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 mx-8">
  <div class="text-2xl font-semibold">Category: {category}</div>
  <ModuleGroup modules={data.modules} />
</div>
