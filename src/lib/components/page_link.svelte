<script lang="ts">
  import { ArrowRight, ExternalLink, Info } from '@lucide/svelte/icons';
  import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';

  let { url, external=false, text, description=null } = $props();
</script>

<div class="flex items-center gap-2">
  <a href={url}
     target={external ? '_blank' : null}
     class="flex
            items-center
            w-[170px]
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
    <Popover>
      <Popover.Trigger>
          <Info class="hover:text-[var(--hover-color)] active:text-[var(--hover-color)]" size={16} />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content class="menu-colors text-sm rounded-sm shadow-sm w-[280px] p-2">
            {@render description()}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover>
  {/if}
</div>
