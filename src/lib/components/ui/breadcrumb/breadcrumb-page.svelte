<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils.js";
    import BreadcrumbItem from "./breadcrumb-item.svelte";

    type $$Props = HTMLAttributes<HTMLSpanElement> & {
        el?: HTMLSpanElement;
    };

    export let el: $$Props["el"] = undefined;
    export let className: $$Props["class"] = undefined;
    export { className as class };
</script>

<BreadcrumbItem>
    <span
        bind:this={el}
        role="link"
        aria-disabled="true"
        aria-current="page"
        class={cn("font-semibold", className)}
        {...$$restProps}
    >
        <slot />
    </span>
</BreadcrumbItem>
