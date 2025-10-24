<script lang="ts">
  import { ArrowRight, ExternalLink, Info } from '@lucide/svelte/icons';
  import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';

  let { url, external=false, width=null, text, description=null } = $props();

  const widthClass = width ? `w-[${width}px]` : '';
</script>

<div class="flex items-center gap-2">
  <a href={url}
     target={external ? '_blank' : null}
     class="flex
            items-center
            {widthClass}
            rounded-sm
            gap-2
            px-2
            py-1
            transition-colors
            ease-[cubic-bezier(0,0,0.2,1)]
            duration-200
            hover:bg-[var(--light-color)]
            hover:text-[var(--dark-color)]
            dark:hover:text-[var(--dark-color)]
            hover:shadow-sm"
  >
    {#if external}
      <ExternalLink size={20} />
    {:else}
      <ArrowRight size={20} />
    {/if}
    <div class="text-lg">
      {@render text()}
    </div>
  </a>
  {#if description}
    <Tooltip>
      <Tooltip.Trigger><Info size={16} /></Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content class="menu-colors text-sm rounded-sm shadow-sm w-[280px] p-2">
            {@render description()}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip>
  {/if}
</div>
