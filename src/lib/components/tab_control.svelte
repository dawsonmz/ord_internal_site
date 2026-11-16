<script lang="ts">
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  
  let { value, isSelected } = $props();
</script>

<Tabs.Trigger {value} class="text-center text-sm py-2.5 w-24 {isSelected ? 'font-semibold' : 'opacity-66'} hover:opacity-100">
  {value}
</Tabs.Trigger>

