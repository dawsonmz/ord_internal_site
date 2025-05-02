<script lang="ts">
  let { skaterNumbers } = $props();
</script>

<div class="flex flex-col space-y-3 text-lg">
  {#each skaterNumbers as skaterNumber}
    <div class="flex gap-3">
      <div class="text-center font-semibold w-14 bg-primary-100 rounded-sm shadow-xs">{skaterNumber.skater_number}</div>
      <div class="w-60">{skaterNumber.derby_name}</div>
    </div>
  {/each}
</div>