<script lang="ts">
  let { header, width=300, children } = $props();

  const widthClass = `w-[300px]`;
</script>

<div class="w-[300px]">
  <div class="text-xl font-semibold mb-2">{header}</div>
  {@render children()}
</div>
