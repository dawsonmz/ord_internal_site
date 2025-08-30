<script lang="ts">
  let { skaterNumbers } = $props();
</script>

<div class="flex flex-col space-y-3 text-lg">
  {#each skaterNumbers as skaterNumber}
    <div class="flex gap-3">
      <div class="badge-colors text-center font-semibold w-14 rounded-sm shadow-sm">{skaterNumber.skater_number}</div>
      <div class="text-base w-60">{skaterNumber.derby_name}</div>
    </div>
  {/each}
</div>
