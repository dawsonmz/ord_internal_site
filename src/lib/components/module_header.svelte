<script lang="ts">
  let { baseClasses='', module } = $props();
</script>

<div class="flex flex-col gap-2 items-start {baseClasses}">
  <div class="text-lg font-semibold">{module.title}</div>
  <div class="flex flex-wrap gap-2">
    {#each module.tags as tag}
      <div
          class="text-center
                 text-xs
                 rounded-sm
                 shadow-sm
                 px-2
                 py-1
                 text-[var(--very-light-color)]"
          style={`background-color: ${tag.color}`}
      >
        {tag.name}
      </div>
    {/each}
  </div>
</div>
