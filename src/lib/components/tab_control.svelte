<script lang="ts">
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  
  let { value, isSelected } = $props();
  let textOpacity = $derived(isSelected ? '' : 'opacity-50');
</script>

<Tabs.Trigger {value} class="main-style text-center text-sm py-2.5 w-[90px] {textOpacity} hover:opacity-100">
  {value}
</Tabs.Trigger>

