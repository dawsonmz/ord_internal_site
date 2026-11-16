<script lang="ts">
  let { heading = '', skaterNumbers } = $props();
</script>

<div class="flex flex-col gap-3 text-lg">
  {#if heading}
    <h2 class="text-md font-semibold">{heading}</h2>
  {/if}
  {#each skaterNumbers as skaterNumber}
    <div class="flex items-center gap-3">
      <div class="text-center
                  font-semibold
                  w-14
                  rounded-sm
                  shadow-sm
                  bg-(--light-color)
                  dark:text-(--dark-color)"
      >
        {skaterNumber.skater_number ?? ''}
      </div>
      <div class="text-base w-45">{skaterNumber.derby_name}</div>
    </div>
  {/each}
</div>
