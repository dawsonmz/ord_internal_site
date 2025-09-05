<script lang="ts">
  let { baseClasses="", clickAction=null, justAButton=false, formAction=null, children } = $props();
</script>

<button
    class="border-1 
           border-[var(--light-color)]
           bg-[var(--light-color)]
           dark:bg-[var(--dark-color)]
           rounded-md
           shadow-md
           p-2
           text-sm
           transition-colors
           ease-[cubic-bezier(0,0,0.2,1)]
           duration-200
           hover:bg-[var(--semi-light-color)]
           hover:border-[var(--semi-light-color)]
           dark:hover:text-[var(--dark-color)]
           active:bg-[var(--hover-color)]
           active:border-[var(--hover-color)]
           {baseClasses}"
    onclick={clickAction}
    type={justAButton ? "button" : "submit"}
    formaction={formAction}
>
  {@render children()}
</button>
