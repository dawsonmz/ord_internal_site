<script lang="ts">
  import { ArrowRight } from '@lucide/svelte/icons';

  let { title, subtitle='', description='', url, hiddenTag=false, current=false, width } = $props();
</script>

<svelte:element this={current ? 'div' : 'a'}
    href={current ? undefined : url}
    aria-current={current ? 'page' : undefined}
    class="{current
             ? 'bg-(--light-color) dark:text-(--dark-color) *:opacity-60'
             : 'transition-colors ease-out duration-200 hover:bg-(--light-color) dark:hover:text-(--dark-color)'}
           border
           border-(--light-color)
           rounded-sm
           sm:rounded-md
           shadow-md
           sm:shadow-lg
           p-3
           sm:p-4"
    style="width: {width}px"
>
  <div class="flex items-center gap-2">
    <ArrowRight class="inline size-5" />
    <div class="text-xl font-semibold">{title}</div>
    {#if hiddenTag}
      <div class="italic text-(--error-color)">(hidden)</div>
    {/if}
  </div>
  {#if subtitle}
    <div class="text-sm subheading mt-2">{subtitle}</div>
  {/if}
  {#if description}
    <div class="text-sm mt-1">{description}</div>
  {/if}
</svelte:element>
