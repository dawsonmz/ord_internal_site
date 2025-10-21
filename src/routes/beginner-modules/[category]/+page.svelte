<script lang="ts">
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import ModuleGroup from '$lib/components/module_group.svelte';

  let { data, form } = $props();
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
  <p>{data.description?.valueOf()}</p>
  {#if data.modules}
    <ModuleGroup modules={data.modules} form={form} />
  {:else}
    No modules found.
  {/if}
</div>
