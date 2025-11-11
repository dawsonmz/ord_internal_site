<script lang="ts">
  import { Info, MessageSquareHeart, Settings2, UserSearch } from '@lucide/svelte/icons';
  import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
  import { enhance } from '$app/forms';
  import { beforeNavigate } from '$app/navigation';
  import AnimatedCheck from '$lib/components/animated_check.svelte';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import Dialog from '$lib/components/dialog.svelte';
  import FormDialog from '$lib/components/form_dialog.svelte';

  let { data, form } = $props();

  let viewSkaterDialogState = $state(false);
  let settingsDialogState = $state(false);
  let submitting = $state(false);
  let userParam = $state('');

  let isSelf = $derived(data.actor_id == data.user_id);
  let allowFeedbackATeam = $state(data.actor_allowance.allow_feedback_a_team);
  let allowFeedbackBTeam = $state(data.actor_allowance.allow_feedback_b_team);

  // This second set of state variables is used to track the persisted values, so we can
  // indicate to the form action handler if an update is actually needed.
  let storedAllowA = $state(data.actor_allowance.allow_feedback_a_team);
  let storedAllowB = $state(data.actor_allowance.allow_feedback_b_team);

  const feedbackTypes = [ 'A Team', 'B Team', 'Self' ];
  const feedbackFormId = 'skater-feedback';
  const settingsFormId = 'settings';

  function closeViewSkaterDialog() {
    viewSkaterDialogState = false;
  }

  function closeSettingsDialog() {
    settingsDialogState = false;
    allowFeedbackATeam = storedAllowA;
    allowFeedbackBTeam = storedAllowB;
  }

  beforeNavigate(
      () => {
        closeViewSkaterDialog();
        closeSettingsDialog();
      }
  );
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Feedback Log</CrumbPage>
</Crumb>

<div class="flex flex-col gap-3 mb-2">
  <div class="text-2xl font-semibold">Feedback Log</div>
  <div class="text-lg">{data.user_name}</div>
</div>

{#each feedbackTypes as feedbackType}
  {#if data.feedback_entries.has(feedbackType)}
    <div class="flex flex-col gap-2 mb-2">
      <div class="flex gap-4 items-center text-xl font-semibold bottom-faded-border">
        {feedbackType}
        {#if feedbackType == 'Self'}
          <Popover>
            <Popover.Trigger>
                <Info class="hover:text-[var(--hover-color)] active:text-[var(--hover-color)]" size=16 />
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content
                    class="menu-colors
                           text-sm
                           rounded-sm
                           shadow-sm
                           p-2
                           w-[280px]
                           dark:border-1
                           dark:border-color-[var(--very-light-color)]"
                >
                  Self registered feedback is only visible to you.
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover>
        {/if}
      </div>
      {#each data.feedback_entries.get(feedbackType) as feedback}
        <div class="text-lg subheading">{feedback.date}</div>
        <div class="font-semibold">From {feedback.from_name}</div>
        <div class="whitespace-pre-line rounded-sm bg-[var(--light-color)] dark:bg-[var(--semi-dark-color)] p-3 mb-2">
          {feedback.text}
        </div>
      {/each}
    </div>
  {/if}
{/each}

{#if !feedbackTypes.some(type => data.feedback_entries.has(type))}
  <div class="mb-2">No feedback found.</div>
{/if}

<div class="flex flex-col gap-4">
  <div class="text-2xl font-semibold">Actions</div>
  <!-- Form for writing feedback -->
  <FormDialog {form} formId={feedbackFormId} formAction="?/skaterfeedback" openFn={() => form = null}>
    {#snippet trigger()}
      <div class="flex gap-2 link-hover items-center w-[190px]">
        {#if form?.formId == feedbackFormId && form?.success}
          <AnimatedCheck color="green" />
        {:else}
          <MessageSquareHeart />
        {/if}
        <div>Write feedback</div>
      </div>
    {/snippet}
    {#snippet header()}
      <div class="text-lg font-semibold">{isSelf ? 'Self Feedback' : 'Skater Feedback'}</div>
      {#if isSelf}
        <div class="text-sm mt-2">
          Feedback you write for yourself is not visible to others.
        </div>
        {#if data.a_team_users.length || data.b_team_users.length}
          <div class="text-sm mt-2">
            To write feedback for another skater, click on <span class="font-semibold">View skater</span>
            and then select <span class="font-semibold">Write feedback</span>.
          </div>
        {/if}
      {/if}
    {/snippet}
    {#snippet formContent()}
      <div class="flex flex-col gap-3 mt-3">
        <input type="hidden" name="userId" value={data.user_id} />
        {#if isSelf}
          <input type="hidden" name="fromUser" value={data.actor_id} />
          <input type="hidden" name="context" value="Self" />
        {:else}
          <label class="label">
            <span class="label-text text-base">From:</span>
            <div class="input text-sm py-2">{data.actor_name}</div>
            <input type="hidden" name="fromUser" value={data.actor_id} />
          </label>
          <div class="label">
            <span class="label-text text-base">For:</span>
            <div class="input text-sm py-2">{data.user_name}</div>
          </div>

          <label class="label">
            <span class="label-text text-base">Context:</span>
            {#if data.can_write_a_team_feedback && !data.can_write_b_team_feedback}
              <div class="input text-sm py-2">A Team</div>
              <input type="hidden" name="context" value="A Team" />
            {:else if data.can_write_b_team_feedback && !data.can_write_a_team_feedback}
              <div class="input text-sm py-2">B Team</div>
              <input type="hidden" name="context" value="B Team" />
            {:else}
              <select id="context" class="input text-sm bg-white dark:bg-[var(--dark-color)] py-2">
                <option value="A Team">A Team</option>
                <option value="B Team">B Team</option>
              </select>
            {/if}
          </label>
        {/if}

        <label class="label">
          <span class="label-text text-base">Text:</span>
          {#if form?.formId == feedbackFormId && form.errors?.text}
            <span class="text-sm font-semibold text-[var(--error-color)]">* {form.errors.text}</span>
          {/if}
          <textarea
              name="text"
              class="textarea resize-none text-sm bg-white dark:bg-[var(--dark-color)] py-2"
              rows=12
              maxlength=3000
          ></textarea>
        </label>
      </div>
    {/snippet}
  </FormDialog>

  <!-- Dropdown & link for viewing skater's feedback page -->
  {#if data.a_team_users.length || data.b_team_users.length}
    <Dialog bind:dialogState={viewSkaterDialogState} openFn={() => form = null}>
      {#snippet trigger()}
        <div class="flex gap-2 link-hover items-center w-[190px]">
          <UserSearch />
          <div>View skater</div>
        </div>
      {/snippet}
      {#snippet content()}
        <div class="text-lg font-semibold">View Skater</div>
        <div class="text-sm mt-2">
          View and write feedback for another skater. Only users who have agreed to receive feedback that type will be viewable.
        </div>
        <select id="user-pick" bind:value={userParam} class="input text-sm bg-white dark:bg-[var(--dark-color)] mt-2">
          <option value="">View self</option>
          {#if data.a_team_users.length}
            <optgroup label="A Team">
              {#each data.a_team_users as user}
                <option value={user.user_id.substring(5)}>{user.name}</option>
              {/each}
            </optgroup>
          {/if}
          {#if data.b_team_users.length}
            <optgroup label="B Team">
            {#each data.b_team_users as user}
              <option value={user.user_id.substring(5)}>{user.name}</option>
            {/each}
            </optgroup>
          {/if}
        </select>
        <div class="flex gap-2 mt-4">
          <a class="flex justify-center items-center button-style text-sm w-[80px] h-[32px] p-2" href="/feedback{userParam ? `?user=${userParam}` : ''}">Go</a>
          <button type="button" class="flex justify-center items-center w-[80px] h-[32px] text-sm p-2 button-style" onclick={() => viewSkaterDialogState = false}>Cancel</button>
        </div>
      {/snippet}
    </Dialog>
  {/if}

  <!-- Form for updating feedback allowance -->
  <Dialog bind:dialogState={settingsDialogState} openFn={() => form = null} closeFn={closeSettingsDialog}>
    {#snippet trigger()}
      <div class="flex gap-2 link-hover items-center w-[190px]">
        {#if form?.formId == settingsFormId && form?.success}
          <AnimatedCheck color="green" />
        {:else}
          <Settings2 />
        {/if}
        <div>Feedback settings</div>
      </div>
    {/snippet}
    {#snippet content()}
      <div class="text-lg font-bold mb-2">Feedback Settings</div>
      <div class="text-sm font-semibold mb-2">Settings for {data.actor_name}</div>
      <form
          method="POST"
          action="?/allowance"
          use:enhance={
            () => {
              submitting = true;
              return async ({ update, formData }) => {
                await update();
                submitting = false;
                allowFeedbackATeam = formData.get('allowA') != null;
                allowFeedbackBTeam = formData.get('allowB') != null;

                if (form?.formId == settingsFormId && form?.success) {
                  settingsDialogState = false;
                  storedAllowA = allowFeedbackATeam;
                  storedAllowB = allowFeedbackBTeam;
                }
              };
            }
          }
      >
        <input type="hidden" name="formId" value={settingsFormId} />
        <input type="hidden" name="storedAllowA" value={storedAllowA} />
        <input type="hidden" name="storedAllowB" value={storedAllowB} />
        <div class="flex flex-col gap-2 mt-3">
          <div class="flex gap-1">
            <label class="inline-block cursor-pointer" for="allowA">
              <input id="allowA" name="allowA" class="toggle-input" type="checkbox" bind:checked={allowFeedbackATeam} />
              <div class="toggle-slider"></div>
              <div class="w-[40px]"></div>
            </label>
            <div class="text-sm">Allow A team feedback</div>
          </div>
          <div class="flex gap-1">
            <label class="inline-block cursor-pointer" for="allowB">
              <input id="allowB" name="allowB" class="toggle-input" type="checkbox" bind:checked={allowFeedbackBTeam} />
              <div class="toggle-slider"></div>
              <div class="w-[40px]"></div>
            </label>
            <div class="text-sm">Allow B team feedback</div>
          </div>
        </div>
        <div class="flex gap-2 mt-5">
          <button type="submit" class="flex justify-center items-center w-[80px] h-[32px] text-sm p-2 button-style" disabled={submitting}>
            {#if submitting}
              <AnimatedDots />
            {:else}
              Save
            {/if}
          </button>
          <button type="button" class="flex justify-center items-center w-[80px] h-[32px] text-sm p-2 button-style" onclick={closeSettingsDialog}>
            Cancel
          </button>
        </div>
      </form>
    {/snippet}
  </Dialog>
</div>
