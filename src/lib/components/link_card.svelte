<script lang="ts">
  import { ArrowRight } from '@lucide/svelte/icons';

  let { title, subtitle='', description='', url, hiddenTag=false } = $props();
</script>

<a href={url}
   class="border-1
          rounded-sm
          sm:rounded-md
          border-[var(--light-color)]
          max-w-90
          shadow-md
          sm:shadow-lg
          p-3
          sm:p-4
          transition-colors
          ease-[cubic-bezier(0,0,0.2,1)]
          duration-200
          hover:bg-[var(--light-color)]
          dark:hover:text-[var(--dark-color)]"
>
  <div class="flex items-center gap-2 mb-2">
    <ArrowRight class="inline size-5" />
    <div class="text-xl font-semibold">{title}</div>
    {#if hiddenTag}
      <div class="italic text-[var(--error-color)]">(hidden)</div>
    {/if}
  </div>
  {#if subtitle}
    <div class="text-sm subheading mb-1">{subtitle}</div>
  {/if}
  {#if description}
    <div class="text-sm">{description}</div>
  {/if}
</a>
