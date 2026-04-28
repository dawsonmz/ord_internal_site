<script lang="ts">
  import { getSanityImageUrl } from "$lib/util/sanity";

  let { portableText } = $props();
</script>

<img src={getSanityImageUrl(portableText.value, 300)} alt="Loaded from Sanity"/>
