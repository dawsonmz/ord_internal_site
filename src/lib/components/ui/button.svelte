<script lang="ts">
    let { baseClasses="", clickAction, children } = $props();
</script>

<button
    class="border-1 
           border-surface-50
           rounded-md
           shadow-md
           p-2
           transition-colors
           ease-[cubic-bezier(0,0,0.2,1)]
           duration-200
           hover:bg-[var(--button-hover-color)]
           hover:border-[var(--button-hover-color)]
           hover:text-[var(--button-inverse-color)]
           active:bg-[var(--button-active-color)]
           active:border-[var(--button-active-color)]
           active:text-[var(--button-inverse-color)]
           {baseClasses}"
    onclick={clickAction}
>
    {@render children()}
</button>
