<script lang="ts">
  let { header, width, children } = $props();
</script>

<div style="width: {width}px">
  <div class="text-xl font-semibold mb-2">{header}</div>
  {@render children()}
</div>
