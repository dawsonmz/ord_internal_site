<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";

  let { title, subtitle="", description, url } = $props();
</script>

<a href="{url}"
    class="border-1
           rounded-md
           border-surface-200-800
           max-w-90
           shadow-lg
           p-5
           transition-colors
           ease-[cubic-bezier(0,0,0.2,1)]
           duration-200
           hover:border-3
           hover:border-[var(--button-hover-color)]
           hover:p-4.5
           active:border-3
           active:border-[var(--button-active-color)]
           active:p-4.5"
>
  <div class="flex items-center gap-2 mb-2">
    <ArrowRight class="inline size-5 sm:size-6" />
    <div class="text-xl sm:text-2xl">{title}</div>
  </div>
  {#if subtitle}
    <div class="text-sm font-semibold sm:text-base">{subtitle}</div>
  {/if}
  <div class="text-sm sm:text-base">{description}</div>
</a>
