<script lang="ts">
  let { baseClasses="", clickAction, children } = $props();
</script>

<button
    class="border-1 
           border-[var(--block-color-very-light)]
           bg-[var(--block-color-very-light)]
           dark:bg-[var(--dark-color)]
           rounded-md
           shadow-md
           p-2
           text-sm
           transition-colors
           ease-[cubic-bezier(0,0,0.2,1)]
           duration-200
           hover:bg-[var(--block-color-light)]
           hover:border-[var(--block-color-light)]
           dark:hover:text-[var(--dark-color)]
           active:bg-[var(--hover-color)]
           active:border-[var(--hover-color)]
           {baseClasses}"
    onclick={clickAction}
>
  {@render children()}
</button>
