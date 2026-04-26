<script lang="ts">
  let { isLink=false, children } = $props();
</script>

<li class="inline-flex items-center gap-1.5 {isLink ? 'strong-hover' : ''}">
  {@render children()}
</li>
