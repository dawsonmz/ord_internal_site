<script lang="ts">
    let { title, subtitle="", description, url } = $props();
</script>

<a href="{url}"
   class="border-1
          rounded-md
          border-surface-200
          shadow-2xl
          hover:bg-[var(--btn-hover-color)]
          hover:border-[var(--btn-hover-color)]
          active:bg-[var(--btn-active-color)]
          active:border-[var(--btn-active-color)]
          transition-all
          ease-[cubic-bezier(0,0,0.2,1)]
          duration-300 p-5"
>
    <div class="text-2xl font-semibold mb-2">{title}</div>
    {#if subtitle}
        <div class="text-lg font-semibold">{subtitle}</div>
    {/if}
    <div>{description}</div>
</a>
