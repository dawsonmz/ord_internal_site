<script lang="ts">
  import { Link } from '@lucide/svelte/icons';
  import { PortableText } from '@portabletext/svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import PortableNormal from '$lib/components/portable_text/portable_normal.svelte';
  import PortablePostImage from '$lib/components/portable_text/portable_post_image.svelte';
  import { formatDateTextWithYear } from '$lib/util/datetime';

  let { data } = $props();

  const components = {
    types: { image: PortablePostImage },
    block: { normal: PortableNormal },
  };
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Updates</CrumbPage>
</Crumb>

<div class="flex flex-col gap-2 border-b-1 border-[var(--faded-dark-color)] dark:border-[var(--faded-light-color)] py-4">
{#each data.posts as post}
  <div id={post.slug} class="flex gap-4 items-center">
    <div class="text-3xl font-semibold">{post.title}</div>
    <a class="link" href="/updates#{post.slug}"><Link /></a>
  </div>
  <div class="text-xl subheading">{formatDateTextWithYear(post.date)}</div>
  <div class="text-md italic">By {post.author}</div>
  <div class="rich-text mt-4">
    <PortableText value={post.post} {components} />
  </div>
{/each}
</div>
