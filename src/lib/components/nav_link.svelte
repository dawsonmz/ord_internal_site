<script lang="ts">
  import { ArrowRight, ExternalLink } from '@lucide/svelte/icons';

  let { label, url, external=false, active=false } = $props();
</script>

<a class="flex items-center gap-2 w-fit strong-hover {active ? 'text-[var(--strong-color-fg-on-dark)] font-semibold' : ''}"
   href={url}
   target={external ? '_blank' : null}
>
  {#if external}
    <ExternalLink size=20 />
  {:else}
    <ArrowRight size=20 />
  {/if}
  <div>{label}</div>
</a>
