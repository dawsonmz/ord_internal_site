<script lang="ts">
  import { getSanityImageUrl } from "$lib/util/sanity";

  let { portableText } = $props();
</script>

<img class="rounded-sm border-1 my-3"
     src={getSanityImageUrl(portableText.value, 300)}
     alt="Loaded from Sanity"
/>
