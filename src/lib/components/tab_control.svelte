<script lang="ts">
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  
  let { value, selectedValue, width, textSize="text-md" } = $props();
  let textOpacity = $derived(value === selectedValue ? '' : 'opacity-50');
</script>

<Tabs.Trigger value={value} class="main-style text-center py-2.5 w-{width} {textSize} {textOpacity} hover:opacity-100">
  {value}
</Tabs.Trigger>

