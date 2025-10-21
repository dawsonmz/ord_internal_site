<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ExternalLink from '@lucide/svelte/icons/external-link';

  let { title, subtitle='', description='', url, external=false, hiddenTag=false } = $props();
</script>

<a href="{url}"
    target={external ? "_blank" : null}
    class="border-1
           rounded-md
           border-[var(--light-color)]
           max-w-90
           shadow-lg
           p-5
           transition-colors
           ease-[cubic-bezier(0,0,0.2,1)]
           duration-200
           hover:bg-[var(--light-color)]
           dark:hover:text-[var(--dark-color)]"
>
  <div class="flex items-center gap-2 mb-2">
    {#if external}
      <ExternalLink class="inline size-5" />
    {:else}
      <ArrowRight class="inline size-5" />
    {/if}
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
