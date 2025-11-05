<script lang="ts">
  import { MessageSquareText } from '@lucide/svelte/icons';
  import { page } from '$app/state';
  import FormDialog from '$lib/components/form_dialog.svelte';

  let { label='', labelClasses='', wrapperClasses='', iconSize=24, context=null, form, formId='default' } = $props();

  const currentPage = page.url.pathname === '/' ? 'home' : page.url.pathname;
  if (context == null) {
    context = `Current page: ${currentPage}`;
  }
</script>

<FormDialog wrapperClasses={wrapperClasses} form={form} formId={formId} formAction="?/sitefeedback" closeFn={() => form = null}>
  {#snippet trigger()}
    <div class="flex items-center gap-2 link-hover">
      <MessageSquareText size={iconSize} />
      {#if label}<span class={labelClasses}>{label}</span>{/if}
    </div>
  {/snippet}
  {#snippet header()}
    <div class="text-lg font-semibold">Feedback</div>
    <div class="text-sm mt-2">
      Your input is appreciated! If you provide contact information, I can follow up for clarification or notify you of any updates.
    </div>
  {/snippet}
  {#snippet formContent()}
    <label class="label mt-4">
      <span class="label-text text-base">Name or contact (optional):</span>
      <input type="text" name="contact" class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2" maxlength=128 />
    </label>

    <label class="label mt-4">
      <span class="label-text text-base mt-2">Regarding:</span>
      <div class="input text-sm py-2">{context}</div>
      <input type="hidden" name="context" value={context} />
    </label>

    <label class="label mt-2">
      <span class="label-text text-base">Comment:</span>
      {#if form?.formId === formId && form.errors?.text}
        <span class="text-sm font-semibold text-[var(--error-color)]">* {form.errors.text}</span>
      {/if}
      <textarea
          name="text"
          class="textarea resize-none text-sm bg-white dark:bg-[var(--dark-color)] py-2"
          rows=6
          maxlength=1024
      ></textarea>
    </label>
  {/snippet}
</FormDialog>
