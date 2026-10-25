<script lang="ts">
  import { ArrowRight, ChevronDown, ChevronUp, ClipboardPen, Dot, GraduationCap } from '@lucide/svelte/icons';
  import { Accordion } from '@skeletonlabs/skeleton-svelte';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import RequiredSkillDialog from '$lib/components/required_skill_dialog.svelte';
  import type { ProgressState, RequiredSkill, SkillStage } from '$lib/server/required_skills';
  import { formatDateNumeric, formatDateTextWithYear } from '$lib/util/datetime';

  let { data, form } = $props();

  let openItems: string[] = $state([]);
  let skillDialog: RequiredSkillDialog | undefined = $state();
  let targetSkill: RequiredSkill | undefined = $state.raw();

  // If the user's name is too long, it can break how the breadcrumbs are displayed.
  const truncatedName = $derived(data.user.name.length > 30 ? `${data.user.name.substring(0, 27)}...` : data.user.name);
  const STAGES: SkillStage[] = [ 'Fundamentals', 'Basic Contact', 'Controlled Gameplay', 'Full Gameplay' ];

  const classByProgress: Record<ProgressState, string> = {
    'Not started': 'not-started',
    'In progress': 'in-progress',
    'Completed': 'completed',
  };
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbLink href="/required-skills">Required Skills</CrumbLink>
  <CrumbSeparator />
  <CrumbPage>{truncatedName}</CrumbPage>
</Crumb>

<div class="font-semibold text-2xl">
  {data.user.name}
</div>

{#if data.user.roles.includes('graduated_beginner')}
  <div
      class="flex
             items-center
             gap-2.5
             self-start
             rounded-lg
             border
             px-3.5
             py-2
             text-sm
             font-semibold
             bg-[#E6F6E3]
             border-(--completed-dot-color)
             text-(--completed-text-color)
             dark:bg-[#1B2E1D]
             dark:border-[#3D6B41]
             dark:text-(--completed-dot-color)"
  >
    <GraduationCap size={20} class="shrink-0 text-[#2F7D32] dark:text-[#8FD18F]" />
    <span>You've graduated from the beginners program!</span>
  </div>
{/if}

<Accordion value={openItems} multiple onValueChange={e => openItems = e.value} class="flex flex-col gap-4">
  {#each STAGES as stage}
    {@const skills = data.required_skills.get(stage)}
    {#if skills}
      <div class="flex flex-col gap-3">
        <div class="font-semibold text-xl">{stage}</div>
        {#each skills as skill (skill.slug)}
          {@const skillProgress = data.required_skill_progress[skill.slug]}
          {@const lastUpdated = skillProgress.feedback.at(-1)?.timestamp}
          <Accordion.Item
              value={skill.slug}
              class="border border-(--light-color) bg-white dark:bg-(--dark-color) rounded-md shadow-md"
          >
            <div class="flex">
              <Accordion.ItemTrigger class="flex flex-1 min-w-0 justify-between items-center gap-3 p-4 text-left strong-hover">
                <div class="flex flex-col gap-0.5 min-w-0">
                  <div class="font-semibold">
                    {skill.title}
                  </div>
                  {#if lastUpdated}
                    <div class="text-xs font-light text-(--dark-color)/63 dark:text-(--very-light-color)/63">
                      Last updated {formatDateNumeric(lastUpdated)}
                    </div>
                  {/if}
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <div class="progress-badge {classByProgress[skillProgress.progress]}">
                    {skillProgress.progress}
                  </div>
                  {#if openItems.includes(skill.slug)}
                    <ChevronUp />
                  {:else}
                    <ChevronDown />
                  {/if}
                </div>
              </Accordion.ItemTrigger>
              {#if data.can_edit_progress}
                <div class="w-px my-3 bg-(--faded-dark-color) dark:bg-(--faded-light-color)" aria-hidden="true"></div>
                <button
                    type="button"
                    class="flex items-center justify-center w-13 shrink-0 strong-hover"
                    onclick={() => {
                      targetSkill = skill;
                      skillDialog?.open();
                    }}
                >
                  <ClipboardPen size={18} />
                  <span class="sr-only">Edit progress</span>
                </button>
              {/if}
            </div>

            <Accordion.ItemContent class="flex flex-col gap-4 px-4 pb-4">
              <div>{skill.importance}</div>

              <div>
                <div class="font-light text-sm">
                  KEY POINTS
                </div>
                <ul class="text-list mt-1">
                  {#each skill.key_points as keyPoint}
                    <li>{keyPoint}</li>
                  {/each}
                </ul>
              </div>

              <div>
                <div class="font-light text-sm mb-1.5">
                  RELATED DRILLS
                </div>
                <a
                    class="link
                           text-center
                           text-xs
                           rounded-sm
                           shadow-sm
                           px-2
                           py-1
                           text-(--very-light-color)
                           w-min"
                    style={`background-color: ${skill.module_tag.color}`}
                    href="/beginner-modules?main_tag={skill.module_tag.slug}"
                >
                  {skill.module_tag.name}
                </a>
              </div>

              <div class="flex flex-col gap-2">
                <div class="font-light text-sm">
                  FEEDBACK
                </div>
                {#if skillProgress.feedback.length}
                  {#each skillProgress.feedback.toReversed() as entry}
                    <div class="flex flex-col gap-2 text-display-box">
                      <div class="flex items-center text-xs font-semibold">
                        <div>{formatDateTextWithYear(entry.timestamp)}</div>
                        <Dot />
                        <div>{entry.author_name}</div>
                      </div>
                      {#if entry.progress}
                        <div class="flex items-center gap-1">
                          <span class="sr-only">Progress:</span>
                          {#if entry.previous_progress}
                            <div class="progress-badge {classByProgress[entry.previous_progress]}">
                              {entry.previous_progress}
                            </div>
                            <ArrowRight size={18} />
                            <span class="sr-only">to</span>
                          {/if}
                          <div class="progress-badge {classByProgress[entry.progress]}">
                            {entry.progress}
                          </div>
                        </div>
                      {/if}
                      {#if entry.text}
                        <div class="text-sm whitespace-pre-line">
                          {entry.text}
                        </div>
                      {/if}
                    </div>
                  {/each}
                {:else}
                  <div class="font-light text-sm italic">
                    No feedback yet.
                  </div>
                {/if}
              </div>
            </Accordion.ItemContent>
          </Accordion.Item>
        {/each}
      </div>
    {/if}
  {/each}
</Accordion>

{#if data.can_edit_progress}
  <RequiredSkillDialog
      bind:this={skillDialog}
      user={data.user}
      skill={targetSkill}
      progress={targetSkill && data.required_skill_progress[targetSkill.slug].progress}
      {form}
  />
{/if}
