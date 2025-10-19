<script lang="ts">
  let { value, selectedValue } = $props();
  let textOpacity = $derived(value.toLocaleLowerCase() == selectedValue ? '' : 'opacity-50');
</script>

<button class="group main-style text-center w-[84px] py-2" type="button">
  <span class="text-sm {textOpacity} group-hover:opacity-100">{value}</span>
</button>
