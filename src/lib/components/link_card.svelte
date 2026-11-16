<script lang="ts">
  import { ArrowRight, Pin } from '@lucide/svelte/icons';

  let { title, subtitle='', description='', url, current=false, width=null } = $props();
</script>

<svelte:element this={current ? 'div' : 'a'}
    href={current ? undefined : url}
    aria-current={current ? 'page' : undefined}
    class="{current
             ? 'bg-(--light-color) dark:text-(--dark-color) border-l-4 border-l-(--strong-color) pl-2.25 sm:pl-3.25'
             : 'shadow-md sm:shadow-lg transition-colors ease-out duration-200 hover:bg-(--light-color) dark:hover:text-(--dark-color)'}
           border
           border-(--light-color)
           rounded-sm
           sm:rounded-md
           p-3
           sm:p-4"
    style={width ? `width: ${width}px` : null}
>
  <div class="flex items-center gap-2">
    {#if current}
      <Pin class="inline size-5" />
    {:else}
      <ArrowRight class="inline size-5" />
    {/if}
    <div class="text-xl font-semibold">{title}</div>
  </div>
  {#if subtitle}
    <div class="text-sm subheading mt-2">{subtitle}</div>
  {/if}
  {#if description}
    <div class="text-sm mt-1">{description}</div>
  {/if}
</svelte:element>
