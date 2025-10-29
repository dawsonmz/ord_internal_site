<script lang="ts">
  let { header="", anchor="", children } = $props();
</script>

<div id={anchor} class="text-xl font-semibold">{header}</div>
<div class="self-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {@render children()}
</div>
