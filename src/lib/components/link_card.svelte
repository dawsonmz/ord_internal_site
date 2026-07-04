<script lang="ts">
  import { ArrowRight } from '@lucide/svelte/icons';

  let { title, subtitle='', description='', url, hiddenTag=false, current=false, width } = $props();
</script>

<svelte:element this={current ? 'div' : 'a'}
    href={current ? undefined : url}
    aria-current={current ? 'page' : undefined}
    class="{current
             ? 'bg-[var(--light-color)] dark:text-[var(--dark-color)] *:opacity-60'
             : 'transition-colors ease-[cubic-bezier(0,0,0.2,1)] duration-200 hover:bg-[var(--light-color)] dark:hover:text-[var(--dark-color)]'}
           border-1
           border-[var(--light-color)]
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
      <div class="italic text-[var(--error-color)]">(hidden)</div>
    {/if}
  </div>
  {#if subtitle}
    <div class="text-sm subheading mt-2">{subtitle}</div>
  {/if}
  {#if description}
    <div class="text-sm mt-1">{description}</div>
  {/if}
</svelte:element>
