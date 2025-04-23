<script lang="ts">
    import ArrowRight from "@lucide/svelte/icons/arrow-right";

    let { title, subtitle="", description, url } = $props();
</script>

<a href="{url}"
   class="border-1
          rounded-md
          border-surface-200
          shadow-2xl
          transition-colors
          ease-[cubic-bezier(0,0,0.2,1)]
          duration-300
          hover:border-3
          hover:border-[var(--btn-hover-color)]
          active:bg-[var(--btn-hover-color)]
          active:border-[var(--btn-hover-color)]
          p-5
          hover:p-4.5"
>
    <div class="flex items-center gap-2 mb-2">
        <ArrowRight class="inline" />
        <div class="text-2xl">{title}</div>
    </div>
    {#if subtitle}
        <div class="text-lg">{subtitle}</div>
    {/if}
    <div>{description}</div>
</a>
