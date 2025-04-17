<script lang="ts">
    export let module, index;
</script>

<div class="rich-text">
    <div class="text-lg font-semibold mb-2">{module.start_time ? `${module.start_time} - ` : ''}{module.title} ({module.minutes} min)</div>
    <div class="tabs tabs-box bg-gray-50 shadow-lg">
        <input type="radio" name="module_tabs_{index}" class="tab font-semibold m-1" aria-label="Short" checked />
        <div class="tab-content p-3">Short training plan</div>

        <input type="radio" name="module_tabs_{index}" class="tab font-semibold m-1" aria-label="Detailed" />
        <div class="tab-content p-3">{@html module.text_html}</div>
        
        <input type="radio" name="module_tabs_{index}" class="tab font-semibold m-1" aria-label="Resources" />
        <div class="tab-content p-3">Additional resources</div>
    </div>
</div>
