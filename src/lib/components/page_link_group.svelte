<script lang="ts">
  let { header, children } = $props();
</script>

<div class="w-[320px]">
  <div class="text-xl font-semibold mb-2">{header}</div>
  {@render children()}
</div>
