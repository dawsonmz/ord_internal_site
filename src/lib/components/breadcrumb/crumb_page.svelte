<script lang="ts">
  import CrumbItem from './crumb_item.svelte';

  let { children } = $props();
</script>

<CrumbItem>
  <span role="link" class="font-semibold" aria-disabled="true" aria-current="page">
    {@render children()}
  </span>
</CrumbItem>
