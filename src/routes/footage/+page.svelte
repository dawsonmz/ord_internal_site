<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Footage</CrumbPage>
</Crumb>

<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/4nXB7tf4LdU"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>
