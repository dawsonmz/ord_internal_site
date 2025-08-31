<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";

  let { title, subtitle="", description="", url } = $props();
</script>

<a href="{url}"
    class="border-1
           rounded-md
           border-[var(--block-color-very-light)]
           max-w-90
           shadow-lg
           p-5
           transition-colors
           ease-[cubic-bezier(0,0,0.2,1)]
           duration-200
           hover:bg-[var(--block-color-very-light)]
           dark:hover:text-[var(--dark-color)]"
>
  <div class="flex items-center gap-2 mb-2">
    <ArrowRight class="inline size-5" />
    <div class="text-xl font-semibold">{title}</div>
  </div>
  {#if subtitle}
    <div class="text-sm font-semibold">{subtitle}</div>
  {/if}
  {#if description}
    <div class="text-sm">{description}</div>
  {/if}
</a>
