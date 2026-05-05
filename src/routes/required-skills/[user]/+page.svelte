<script lang="ts">
  import { Dot } from '@lucide/svelte/icons';
  import { Crumb, CrumbHome, CrumbLink, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import type { ProgressState, SkillStage } from '$lib/server/required_skills';
  import { formatDateTextWithYear } from '$lib/util/datetime';

  let { data } = $props();

  // If the user's name is too long, it can break how the breadcrumbs are displayed.
  const truncatedName = data.user_name.length > 30 ? `${data.user_name.substring(0, 27)}...` : data.user_name;
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
  {data.user_name}
</div>

<div class="flex flex-col gap-4">
  {#each STAGES as stage}
    {@const skills = data.required_skills.get(stage)}
    {#if skills}
      <div class="flex flex-col gap-3">
        <div class="font-semibold text-xl">{stage}</div>
        {#each skills as skill (skill.slug)}
          {@const skillProgress = data.required_skill_progress[skill.slug]}
          <div class="flex flex-col gap-4 border-1 border-(--light-color) bg-white dark:bg-(--dark-color) rounded-md shadow-md p-4">
            <div class="flex justify-between">
              <div class="font-semibold">
                {skill.title}
              </div>
              <div class="progress-badge {classByProgress[skillProgress.progress]}">
                {skillProgress.progress}
              </div>
            </div>

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
                         text-[var(--very-light-color)]
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
                  <div class="text-display-box">
                    <div class="flex items-center text-xs font-semibold">
                      <div>{formatDateTextWithYear(entry.timestamp)}</div>
                      <Dot />
                      <div>{entry.author_name}</div>
                    </div>
                    <div class="text-sm whitespace-pre-line">
                      {entry.text}
                    </div>
                  </div>
                {/each}
              {:else}
                <div class="font-light text-sm italic">
                  No feedback yet.
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/each}
</div>
