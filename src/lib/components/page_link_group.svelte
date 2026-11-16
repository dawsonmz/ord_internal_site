<script lang="ts">
  let { header, children } = $props();
</script>

<div class="w-fit">
  <h2 class="text-xl font-semibold mb-2">{header}</h2>
  {@render children()}
</div>
