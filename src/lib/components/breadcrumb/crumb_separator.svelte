<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';

  let { baseClasses="" } = $props();
</script>

<li role="presentation" class="[&>svg]:size-3.5 {baseClasses}" aria-hidden="true">
  <ChevronRight />
</li>
