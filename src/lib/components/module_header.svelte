<script lang="ts">
  let { baseClasses='', titleClasses='', module } = $props();
</script>

<div class="flex flex-col gap-2 items-start {baseClasses}">
  <div class="text-lg font-semibold {titleClasses}">{module.title}</div>
  <div class="flex flex-wrap gap-2 text-xs">
    {#each module.tags as tag}
      <div
          class="text-center
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
