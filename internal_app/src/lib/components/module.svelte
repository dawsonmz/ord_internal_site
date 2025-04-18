<script lang="ts">
    export let module, index;
    let detailed_text_disabled: boolean = !module.detailed_text_html;
    let resources_disabled: boolean = !module.resources;
</script>

<div class="rich-text">
    <div class="text-lg font-semibold mb-2">{module.start_time ? `${module.start_time} - ` : ''}{module.title} ({module.minutes} min)</div>
    <div class="tabs tabs-box bg-gray-50 shadow-lg">
        <input type="radio" name="module_tabs_{index}" class="tab font-semibold m-1" aria-label="Short" checked />
        <div class="tab-content p-3">{@html module.short_text_html}</div>

        <input type="radio" name="module_tabs_{index}" class="tab font-semibold m-1" aria-label="Detailed" disabled="{detailed_text_disabled}" />
        <div class="tab-content p-3">{@html module.detailed_text_html}</div>
        
        <input type="radio" name="module_tabs_{index}" class="tab font-semibold m-1" aria-label="Resources" disabled="{resources_disabled}" />
        <div class="tab-content p-3">Additional resources</div>
    </div>
</div>
