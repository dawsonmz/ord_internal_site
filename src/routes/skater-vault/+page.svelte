<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index.js';
  import SkaterNumberGroup from '$lib/components/skater_number_group.svelte';

  let { data } = $props();
  let query = $state('');

  let skaterNumbers = $derived(
    data.skater_numbers.filter(
        (skaterNumber) => {
          const queryNormalized = query.toLowerCase().trim();
          return !queryNormalized
              || skaterNumber.skater_number.includes(queryNormalized)
              || skaterNumber.derby_name_lower.includes(queryNormalized);
        }
    )
  );

  let skaterSplitCount = $derived(Math.ceil(data.skater_numbers.length / 2));
  let skaterNumbersCol1 = $derived(skaterNumbers.slice(0, skaterSplitCount));
  let skaterNumbersCol2 = $derived(skaterNumbers.slice(skaterSplitCount));
</script>

<Crumb baseClasses="mx-8 mb-5">
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Skater Vault</CrumbPage>
</Crumb>

<div class="flex flex-col mx-8 gap-4">
  <div class="text-xl font-semibold">Skater Vault</div>
  <div class="text-sm">
    <p>
      These are the skater numbers and derby names currently registered with ORD. If you would like to register a derby name and number, send a message to Creek.
    </p>
    <p class="mt-2">
      If the number you want is already taken, check in regardless. If the skater is not active,
      we can reach out to verify if they want to keep it.
    </p>
  </div>
  <input type="text" class="input max-w-148 bg-white dark:bg-[var(--dark-color)]" placeholder="Search for number or name" bind:value={query} />
  {#if skaterNumbers.length}
    <div class="sm:hidden">
      <SkaterNumberGroup skaterNumbers={skaterNumbers} />
    </div>
    <div class="flex max-sm:hidden mt-2">
      <SkaterNumberGroup skaterNumbers={skaterNumbersCol1} />
      <SkaterNumberGroup skaterNumbers={skaterNumbersCol2} />
    </div>
  {:else}
    <div class="font-semibold">No results found.</div>
  {/if}
</div>
