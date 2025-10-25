<script lang="ts">
  import { ArrowRight, ExternalLink, Info } from '@lucide/svelte/icons';
  import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';

  let { url, external=false, text, description=null } = $props();
</script>

<div class="flex items-center gap-2">
  <a href={url} target={external ? '_blank' : null} class="flex items-center w-[170px] gap-2 link-hover">
    {#if external}
      <ExternalLink size=20 />
    {:else}
      <ArrowRight size=20 />
    {/if}
    <div class="text-lg">
      {@render text()}
    </div>
  </a>
  {#if description}
    <Popover>
      <Popover.Trigger>
          <Info class="hover:text-[var(--hover-color)] active:text-[var(--hover-color)]" size=16 />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
              class="menu-colors
                     text-sm
                     rounded-sm
                     shadow-sm
                     p-2
                     w-[280px]
                     dark:border-1
                     dark:border-color-[var(--very-light-color)]"
          >
            {@render description()}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover>
  {/if}
</div>
