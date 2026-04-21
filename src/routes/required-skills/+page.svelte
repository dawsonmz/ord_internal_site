<script lang="ts">
  import { ChevronRight } from '@lucide/svelte';
  import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import RequiredSkillDialog from '$lib/components/required_skill_dialog.svelte';
  import type { ProgressState, RequiredSkill, RequiredSkillProgress, SkillStage } from '$lib/server/required_skills';
  import type { User } from '$lib/server/users';
  import { dropUserIdPrefix } from '$lib/util/users';

  let { data, form } = $props();

  let activeUser: User | undefined = $state();
  let activeSkill: RequiredSkill | undefined = $state();
  let activeSkillProgress: RequiredSkillProgress | undefined = $state();
  let dialogState = $state(false);

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
  <CrumbPage>Required Skills</CrumbPage>
</Crumb>

{#each STAGES as stage}
  {#if data.required_skills.has(stage)}
    <div class="flex flex-col gap-3">
      <div class="font-bold text-lg">
        {stage}
      </div>
      <div class="legend-row">
        {#each data.required_skills.get(stage) as skill, index}
          <div class="legend-item">
            <span class="legend-num">{index + 1}.</span>
            <span>{skill.title}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
{/each}

<div class="flex flex-col gap-4">
  <div class="font-bold text-lg">Skaters</div>
  {#each data.users as user (user.user_id)}
    <div class="flex flex-col gap-3 border-1 border-(--light-color) bg-white dark:bg-(--dark-color) rounded-md shadow-md p-3">
      <div>
        <a class="flex justify-between link" href="/required-skills/{dropUserIdPrefix(user.user_id)}">
          <div class="font-semibold">
            {user.name}
          </div>
          <ChevronRight />
        </a>
      </div>

      {#each STAGES as stage}
        {#if data.required_skills.has(stage)}
          <div class="flex flex-col gap-2">
            <div class="font-light text-xs uppercase">
              {stage}
            </div>
            <div class="flex flex-wrap gap-1.5">
              {#each data.required_skills.get(stage) as skill, index (skill.slug)}
                {@const progress = data.required_skill_progress.get(user.user_id)?.[skill.slug]
                    ?? {
                      user_id: user.user_id,
                      skill_slug: skill.slug,
                      progress: 'Not started',
                      feedback: [],
                    }
                }
                <Tooltip openDelay={200} closeOnPointerDown={true}>
                  <Tooltip.Trigger
                      class="dot {classByProgress[progress.progress]}"
                      onclick={() => {
                        activeUser = user;
                        activeSkill = skill;
                        activeSkillProgress = progress;
                        dialogState = true;
                      }}
                  >
                    {index + 1}
                  </Tooltip.Trigger>
                  <Portal>
                    <Tooltip.Positioner>
                      <Tooltip.Content class="bg-(--dark-color) text-white text-sm rounded shadow-md px-2 py-1">
                        {skill.title}
                      </Tooltip.Content>
                    </Tooltip.Positioner>
                  </Portal>
                </Tooltip>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<RequiredSkillDialog
    bind:dialogState
    user={activeUser}
    requiredSkill={activeSkill}
    requiredSkillProgress={activeSkillProgress}
    {form}
>
</RequiredSkillDialog>
