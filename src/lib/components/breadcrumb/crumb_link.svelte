<script lang="ts">
  import CrumbItem from './crumb_item.svelte';

  let { href, children } = $props();
</script>

<CrumbItem isLink={true}>
  <a href={href}>{@render children()}</a>
</CrumbItem>
