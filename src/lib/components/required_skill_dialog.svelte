<script lang="ts">
  import { enhance } from '$app/forms';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import Dialog from '$lib/components/dialog.svelte';
  import type { ProgressState, RequiredSkill, RequiredSkillProgress } from '$lib/server/required_skills';
  import type { User } from '$lib/server/users';

  let { dialogState = $bindable(), user, requiredSkill, requiredSkillProgress, form } = $props<{
      dialogState: boolean,
      user: User | undefined,
      requiredSkill: RequiredSkill | undefined,
      requiredSkillProgress: RequiredSkillProgress | undefined,
      form: any,
  }>();

  let initialProgress = $derived(requiredSkillProgress?.progress ?? 'Not started');
  let submitting = $state(false);
  let selected = $derived<ProgressState>(initialProgress);
  let updated = $derived(selected != initialProgress);
</script>

<Dialog bind:dialogState openFn={() => form = null} closeFn={() => selected = initialProgress}>
  {#snippet content()}
    <form
        method="POST"
        action="?/updateprogress"
        use:enhance={
          () => {
            submitting = true;
            return async ({ update }) => {
              await update();
              submitting = false;
              if (form?.success) {
                dialogState = false;
              }
            };
          }
        }
    >
      <div class="flex flex-col gap-1">
        <div>
          <span class="font-bold">{requiredSkill?.title}</span>
          <span>for {user?.name}</span>
        </div>
        <div class="font-light text-sm">
          PROGRESS
        </div>
        <div class="flex gap-2 justify-between text-sm">
          <button
              type="button"
              class="progress-option"
              onclick={() => selected = 'Not started'}
              data-state={selected == 'Not started' ? 'selected' : undefined}
          >
            <span class="dialog-dot" style="background: var(--not-started-dot-color);"></span>
            Not started
          </button>
          <button
              type="button"
              class="progress-option"
              onclick={() => selected = 'In progress'}
              data-state={selected == 'In progress' ? 'selected' : undefined}
          >
            <span class="dialog-dot" style="background: var(--in-progress-dot-color);"></span>
            In progress
          </button>
          <button
              type="button"
              class="progress-option"
              onclick={() => selected = 'Completed'}
              data-state={selected == 'Completed' ? 'selected' : undefined}
          >
            <span class="dialog-dot" style="background: var(--completed-dot-color);"></span>
            Complete
          </button>
        </div>
      </div>

      <div class="flex gap-2 mt-4">
        <input type="hidden" name="userId" value={user?.user_id} />
        <input type="hidden" name="skill" value={requiredSkill?.slug} />
        <input type="hidden" name="progress" value={selected} />
        <button type="submit" class="flex justify-center items-center w-[80px] h-[32px] text-sm p-2 button-style" disabled={submitting || !updated}>
          {#if submitting}
            <AnimatedDots />
          {:else}
            Save
          {/if}
        </button>
        <button type="button" class="flex justify-center items-center w-[80px] h-[32px] text-sm p-2 button-style" onclick={() => dialogState = false}>
          Cancel
        </button>
      </div>
    </form>
  {/snippet}
</Dialog>
