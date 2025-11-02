<script lang="ts">
  let { portableText, children } = $props();

  const text = $derived(portableText.value.children);
  const isEmpty = $derived(text.length == 1 && text[0].text == '');
</script>

{#if isEmpty}
  <br>
{:else}
  {@render children()}
{/if}
