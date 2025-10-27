<script lang="ts">
  let { heading="", skaterNumbers } = $props();
</script>

<div class="flex flex-col gap-3 text-lg">
  {#if heading}
    <div class="text-md font-semibold">{heading}</div>
  {/if}
  {#each skaterNumbers as skaterNumber}
    <div class="flex items-center gap-3">
      <div class="text-center
                  font-semibold
                  w-[56px]
                  rounded-sm
                  shadow-sm
                  bg-[var(--light-color)]
                  dark:text-[var(--dark-color)]"
      >
        {skaterNumber.skater_number ?? ""}
      </div>
      <div class="text-base w-[180px]">{skaterNumber.derby_name}</div>
    </div>
  {/each}
</div>
