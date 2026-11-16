<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import TabControl from '$lib/components/tab_control.svelte';
  import { getSanityImageUrl } from '$lib/util/sanity';

  let { data } = $props();
  let play = $derived(data.play);
  let hasText = $derived(Boolean(play.notes?.length || play.drills?.length));

  let view = $state('Diagram');
  let video: HTMLVideoElement | undefined = $state();

  function showView(newView: string) {
    view = newView;
    if (newView == 'Animation') {
      // Rejects if the video is paused again before playback has started
      video?.play().catch(() => {});
    } else {
      video?.pause();
    }
  }
</script>

<svelte:head>
  <title>Playbook: {play.title} · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/playbook">Playbook</CrumbLink>
  <CrumbSeparator />
  <CrumbLink href="/playbook#{play.scenario}">{play.scenario_name}</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{play.title}</CrumbPage>
</Crumb>

<div>
  <h1 class="text-2xl font-semibold">{play.title}</h1>
  <div class="subheading">{play.scenario_name} · {play.configuration}</div>
</div>

<div class="flex flex-col gap-4 {hasText ? 'xl:grid xl:grid-cols-5 xl:gap-8 xl:items-start' : ''}">
  <Tabs class="xl:col-span-3 xl:sticky xl:top-5" value={view} onValueChange={e => showView(e.value)}>
    <div class="overflow-hidden rounded-md border border-(--faded-dark-color) dark:border-(--faded-light-color) bg-white">
      <Tabs.Content value="Diagram">
        <img
            class="w-full"
            style="aspect-ratio: {play.aspect_ratio}"
            src={getSanityImageUrl(play.diagram, 1280)}
            alt="Diagram of {play.title}"
        />
      </Tabs.Content>
      {#if play.animation_url}
        <Tabs.Content value="Animation">
          <video
              bind:this={video}
              class="w-full"
              style="aspect-ratio: {play.aspect_ratio}"
              src={play.animation_url}
              controls={true}
              loop={true}
              muted={true}
              playsinline={true}
              preload="none"
          ></video>
        </Tabs.Content>
      {/if}
    </div>
    {#if play.animation_url}
      <Tabs.List class="mt-2">
        <TabControl value="Diagram" isSelected={view == 'Diagram'} />
        <TabControl value="Animation" isSelected={view == 'Animation'} />
        <Tabs.Indicator class="border-y w-24" />
      </Tabs.List>
    {/if}
  </Tabs>

  {#if hasText}
    <div class="flex flex-col gap-4 xl:col-span-2">
      {#if play.notes?.length}
        <div class="rich-text">
          <PortableText value={play.notes} />
        </div>
      {/if}

      {#if play.drills?.length}
        <h2 class="text-xl font-semibold mt-2 xl:first:mt-0">Drills</h2>
        {#each play.drills as drill, index}
          <div class={index > 0 ? 'top-faded-border' : ''}>
            <div class="font-semibold">{drill.title}</div>
            {#if drill.description}
              <div class="rich-text">
                <PortableText value={drill.description} />
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>
