<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';

  let { data } = $props();
  const feedbackTypes = [ 'A Team', 'B Team' ];
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Feedback</CrumbPage>
</Crumb>

<div class="text-2xl font-semibold">Feedback Log for {data.name}</div>

{#each feedbackTypes as feedbackType}
  {#if data.feedback_entries.has(feedbackType)}
    <div class="flex flex-col gap-2">
      <div class="text-2xl font-semibold bottom-faded-border">{feedbackType}</div>
      {#each data.feedback_entries.get(feedbackType) as feedback}
        <div class="text-lg subheading">{feedback.date}</div>
        <div class="italic">From {feedback.from}</div>
        <div class="whitespace-pre-line rounded-sm bg-[var(--light-color)] dark:bg-[var(--semi-dark-color)] p-3 mb-4">{feedback.text}</div>
      {/each}
    </div>
  {/if}
{/each}

{#if !feedbackTypes.some(type => data.feedback_entries.has(type))}
  <div class="italic">No feedback found.</div>
{/if}
