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
           hover:bg-[var(--hover-color)]
           hover:border-[var(--hover-color)]
           dark:hover:text-[var(--dark-color)]
           active:bg-[var(--block-color-very-light)]
           active:border-[var(--block-color-very-light)]
           {baseClasses}"
    onclick={clickAction}
>
  {@render children()}
</button>
