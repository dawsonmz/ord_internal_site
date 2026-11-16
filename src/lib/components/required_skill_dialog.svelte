<script lang="ts">
  import { enhance } from '$app/forms';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import Dialog from '$lib/components/dialog.svelte';
  import type { ProgressState, RequiredSkill } from '$lib/server/required_skills';
  import type { User } from '$lib/server/users';

  let { form, user, skill, progress }: {
    form: any,
    user?: User,
    skill?: RequiredSkill,
    progress?: ProgressState,
  } = $props();

  let dialogState = $state(false);
  let selected: ProgressState = $state('Not started');
  let newFeedbackText = $state('');
  let submitting = $state(false);
  let updated = $derived(selected != progress || newFeedbackText.trim() != '');

  function reset() {
    selected = progress ?? 'Not started';
    newFeedbackText = '';
  }

  export function open() {
    reset();
    dialogState = true;
  }
</script>

<Dialog bind:dialogState>
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
          <div class="muted-text text-sm">
            PROGRESS
          </div>
          <div class="flex gap-2 justify-between text-sm">
            <button
                type="button"
                class="progress-option"
                onclick={() => selected = 'Not started'}
                data-state={selected == 'Not started' ? 'selected' : undefined}
                aria-pressed={selected == 'Not started'}
            >
              <span class="dialog-dot not-started"></span>
              Not started
            </button>
            <button
                type="button"
                class="progress-option"
                onclick={() => selected = 'In progress'}
                data-state={selected == 'In progress' ? 'selected' : undefined}
                aria-pressed={selected == 'In progress'}
            >
              <span class="dialog-dot in-progress"></span>
              In progress
            </button>
            <button
                type="button"
                class="progress-option"
                onclick={() => selected = 'Completed'}
                data-state={selected == 'Completed' ? 'selected' : undefined}
                aria-pressed={selected == 'Completed'}
            >
              <span class="dialog-dot completed"></span>
              Complete
            </button>
          </div>
        </div>

        <!-- Feedback input -->
        <div class="flex flex-col gap-2">
          <div class="muted-text text-sm">
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
        {#if selected != progress}
          <input type="hidden" name="progress" value={selected} />
        {/if}
        <button
            type="submit"
            class="flex justify-center items-center w-20 text-sm px-2 button-primary"
            disabled={submitting || !updated}
        >
          {#if submitting}
            <AnimatedDots />
          {:else}
            Save
          {/if}
        </button>
        <button
            type="button"
            class="flex justify-center items-center w-20 text-sm px-2 button-secondary"
            onclick={() => dialogState = false}
        >
          Cancel
        </button>
      </div>
    </form>
  {/snippet}
</Dialog>
