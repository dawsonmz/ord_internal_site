<script lang="ts">
  import CrumbItem from './crumb_item.svelte';

  let { baseClasses="", href, children } = $props();
</script>

<CrumbItem baseClasses="link {baseClasses}">
  <a href={href}>{@render children()}</a>
</CrumbItem>
