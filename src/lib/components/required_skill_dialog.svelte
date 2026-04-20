<script lang="ts">
  import { enhance } from '$app/forms';
  import { Dot } from '@lucide/svelte/icons';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import Dialog from '$lib/components/dialog.svelte';
  import type { ProgressState, RequiredSkill, RequiredSkillProgress } from '$lib/server/required_skills';
  import type { User } from '$lib/server/users';
  import { formatDateTextWithYear } from '$lib/util/datetime';

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
  let newFeedbackText = $state('');
  let mostRecentFeedback = $derived(requiredSkillProgress?.feedback?.at(-1));
  let updated = $derived(selected != initialProgress || newFeedbackText.trim() != '');
</script>

<Dialog bind:dialogState openFn={() => form = null} closeFn={() => { selected = initialProgress; newFeedbackText = ''; }}>
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
          <span class="font-bold">{requiredSkill?.title}</span>
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
              class="textarea resize-none text-sm bg-white dark:bg-[var(--dark-color)] py-2"
              rows=6
              maxlength=3000
          ></textarea>
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
