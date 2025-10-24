<script lang="ts">
  import CrumbLink from './crumb_link.svelte';
  import { HouseIcon } from '@lucide/svelte/icons';

  let { baseClasses="" } = $props();
</script>

<CrumbLink href="/" baseClasses={baseClasses}><HouseIcon size=22 /></CrumbLink>
