<script lang="ts">
  let { header, width=300, children } = $props();

  const widthClass = `w-[${width}px]`;
</script>

<div class={widthClass}>
  <div class="text-xl font-semibold mb-2">{header}</div>
  {@render children()}
</div>
