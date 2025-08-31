<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from "$lib/components/breadcrumb/index.js";
  import ModuleGroup from '$lib/components/module_group.svelte';

  let { data } = $props();
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/beginner-modules">Beginner Modules</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{data.category}</CrumbPage>
</Crumb>

<div class="flex flex-col gap-6 mx-8">
  <div class="text-xl font-semibold">Category: {data.category}</div>
  {#if data.modules}
    <ModuleGroup modules={data.modules} />
  {:else}
    No modules found.
  {/if}
</div>
