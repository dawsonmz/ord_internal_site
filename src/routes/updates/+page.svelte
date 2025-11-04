<script lang="ts">
  import { page } from '$app/state';
  import { Link } from '@lucide/svelte/icons';
  import { PortableText } from '@portabletext/svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import PortableNormal from '$lib/components/portable_text/portable_normal.svelte';
  import PortablePostImage from '$lib/components/portable_text/portable_post_image.svelte';
  import { formatDateTextWithYear } from '$lib/util/datetime';

  let { data } = $props();
  const showHidden = $derived(page.url.searchParams.get('show-hidden')?.trim().toLowerCase() === 'true');
  const hiddenQuery = $derived(showHidden ? '?show-hidden=true' : '');

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

<div class="flex flex-col gap-1 border-b-1 border-[var(--faded-dark-color)] dark:border-[var(--faded-light-color)] pb-4">
  {#each data.posts as post}
    <div id={post.slug} class="text-2xl sm:text-3xl font-semibold">
      {post.title}
    </div>
    <div class="flex gap-3 items-center">
      <div class="text-lg sm:text-xl subheading">
        {formatDateTextWithYear(post.date)}
      </div>
      <a class="link" href="/updates{hiddenQuery}#{post.slug}">
        <Link size={20}/>
      </a>
    </div>
    <div class="text-md italic">By {post.author}</div>
    {#if !post.visible}
      <div class="italic text-[var(--error-color)]">(hidden)</div>
    {/if}
    <div class="rich-text mt-4">
      <PortableText value={post.post} {components} />
    </div>
  {/each}
</div>
