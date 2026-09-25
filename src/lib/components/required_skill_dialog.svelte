<script lang="ts">
  import { enhance } from '$app/forms';
  import { Dot, Pencil } from '@lucide/svelte/icons';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import Dialog from '$lib/components/dialog.svelte';
  import type { ProgressState, RequiredSkill, RequiredSkillProgress } from '$lib/server/required_skills';
  import type { User } from '$lib/server/users';
  import { formatDateTextWithYear } from '$lib/util/datetime';

  let { form, user, skill, progress, showTrigger=false } = $props<{
    form: any,
    user?: User,
    skill?: RequiredSkill,
    progress?: RequiredSkillProgress,
    showTrigger?: boolean,
  }>();

  let dialogState = $state(false);
  let selected: ProgressState = $state('Not started');
  let newFeedbackText = $state('');
  let submitting = $state(false);
  let mostRecentFeedback = $derived(progress?.feedback?.at(-1));
  let updated = $derived(selected != progress?.progress || newFeedbackText.trim() != '');

  function reset() {
    selected = progress?.progress ?? 'Not started';
    newFeedbackText = '';
  }

  export function open() {
    reset();
    dialogState = true;
  }
</script>

{#snippet pencilTrigger()}
  <div class="flex items-center block-hover">
    <Pencil size={16} />
    <span class="sr-only">Edit progress</span>
  </div>
{/snippet}

<Dialog bind:dialogState openFn={reset} trigger={showTrigger ? pencilTrigger : null}>
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
      <div class="flex flex-col gap-3">
        <!-- Skill & skater heading -->
        <div>
          <span class="font-bold">{skill?.title}</span>
          <span>for {user?.name}</span>
        </div>
        
        <!-- Progress options -->
        <div class="flex flex-col gap-2">
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

        <!-- Feedback display -->
        <div class="flex flex-col gap-1">
          <div class="font-light text-sm">
            MOST RECENT FEEDBACK
          </div>
          {#if mostRecentFeedback}
            <div class="text-display-box">
              <div class="flex items-center text-xs font-semibold">
                <div>{formatDateTextWithYear(mostRecentFeedback.timestamp)}</div>
                <Dot />
                <div>{mostRecentFeedback.author_name}</div>
              </div>
              <div class="text-sm whitespace-pre-line">
                {mostRecentFeedback.text}
              </div>
            </div>
          {:else}
            <div class="text-sm italic mt-1">
              No feedback found
            </div>
          {/if}
        </div>

        <!-- Feedback input -->
        <div class="flex flex-col gap-2">
          <div class="font-light text-sm">
            ADD FEEDBACK
          </div>
          <textarea
              name="feedback"
              bind:value={newFeedbackText}
              class="textarea resize-none text-sm bg-white dark:bg-(--dark-color) py-2"
              rows=6
              maxlength=3000
          ></textarea>
        </div>
      </div>

      <div class="flex gap-2 mt-4">
        <input type="hidden" name="userId" value={user?.user_id} />
        <input type="hidden" name="skill" value={skill?.slug} />
        <input type="hidden" name="progress" value={selected} />
        <button type="submit" class="flex justify-center items-center w-20 h-8 text-sm p-2 button-style" disabled={submitting || !updated}>
          {#if submitting}
            <AnimatedDots />
          {:else}
            Save
          {/if}
        </button>
        <button type="button" class="flex justify-center items-center w-20 h-8 text-sm p-2 button-style" onclick={() => dialogState = false}>
          Cancel
        </button>
      </div>
    </form>
  {/snippet}
</Dialog>
