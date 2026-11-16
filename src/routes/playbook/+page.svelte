<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import { getSanityImageUrl } from '$lib/util/sanity';

  let { data } = $props();
</script>

<svelte:head>
  <title>Playbook · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Playbook</CrumbPage>
</Crumb>

<h1 class="text-2xl font-semibold">Playbook</h1>
<div class="flex flex-wrap gap-x-4 gap-y-2 text-sm md:hidden">
  {#each data.scenarios as scenario}
    <a class="link underline" href="#{scenario.slug}">{scenario.name} plays</a>
  {/each}
</div>

<div class="flex flex-col gap-8">
  {#each data.scenarios as scenario}
    <div id={scenario.slug} class="flex flex-col gap-3 scroll-mt-4">
      <h2 class="text-xl font-semibold bottom-faded-border">{scenario.name}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {#each scenario.plays as play}
          <a
              class="flex
                     flex-col
                     gap-2.5
                     p-2.5
                     border
                     border-(--light-color)
                     rounded-md
                     shadow-md
                     transition-colors
                     ease-out
                     duration-200
                     hover:bg-(--light-color)
                     dark:hover:text-(--dark-color)"
              href="/playbook/{play.slug}"
          >
            <img
                class="w-full
                       aspect-video
                       object-contain
                       rounded-sm
                       border
                       border-(--faded-dark-color)
                       dark:border-(--faded-light-color)
                       bg-white"
                src={getSanityImageUrl(play.diagram, 640)}
                alt="Diagram of {play.title}"
            />
            <div>
              <div class="font-semibold">{play.title}</div>
              <div class="text-sm subheading">{play.configuration}</div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>
