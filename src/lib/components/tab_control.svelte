<script lang="ts">
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  
  let { value, selectedValue, width, textSize="text-md" } = $props();
  let textOpacity = $derived(value === selectedValue ? '' : 'opacity-50');
</script>

<Tabs.Trigger value={value}>
  <button class="group main-style text-center py-2 w-{width}" type="button">
    <span class="{textSize} {textOpacity} group-hover:opacity-100">{value}</span>
  </button>
</Tabs.Trigger>

