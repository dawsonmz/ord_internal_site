<script lang="ts">
  let { header="", baseClasses="", anchor="", children } = $props();
</script>

<div id={anchor} class="flex flex-col gap-4 sm:gap-6 {baseClasses}">
  <div class="text-xl font-semibold">{header}</div>
  <div class="self-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
    {@render children()}
  </div>
</div>
