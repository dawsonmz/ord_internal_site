import { error } from '@sveltejs/kit';
import type { Module } from '$lib/server/modules';
import { formatDateText, formatDateTextFromDate, formatTimeText } from '$lib/util/datetime';
import { sanityClient } from '$lib/util/sanity';

export interface TrainingPlanSeason {
  name: string,
  slug: string,
}

interface SeasonWithTrainingSummaries {
  name: string,
  slug: string,
  training_plans: TrainingPlanSummary[],
}

interface TrainingPlanSummary {
  training_label: string,
  slug: string,
  date_time: string,
  summary: string,
  visible: boolean,

  // Computed fields:
  date_text: string,
}

interface TrainingPlan {
  training_label: string,
  season: string,
  date_time: string,
  summary: string,
  visible: boolean,
  omit_timestamps: boolean,
  modules: Module[],

  // Computed fields:
  date_text: string,
}

/**
 * @param showHidden If true, considers all training plans, including those not marked visible
 * @returns Names and slugs of all seasons that have training plans, in season order
 */
export async function loadSeasonsWithTrainingPlans(showHidden: boolean): Promise<TrainingPlanSeason[]> {
  const visibleFilter = showHidden ? '' : '&& visible';
  return await sanityClient.option.fetch(
      `*[_type == "season" && count(*[_type == "training_plan" && season._ref == ^._id ${visibleFilter}]) > 0] | order(orderRank asc) {
        name,
        "slug": slug.current,
      }`
  );
}

/**
 * @param seasonSlug Slug for the season being loaded, e.g. 'spring2025'
 * @param showHidden If true, shows all training plans, including those not marked visible
 * @returns The season's name, slug, and training plan summaries
 */
export async function loadTrainingPlanSummaries(seasonSlug: string, showHidden: boolean): Promise<SeasonWithTrainingSummaries> {
  const visibleFilter = showHidden ? '' : '&& visible';
  const seasonData: SeasonWithTrainingSummaries[] = await sanityClient.option.fetch(
    `*[_type == "season" && slug.current == $season] {
      name,
      "slug": slug.current,
      "training_plans": *[_type == "training_plan" && season._ref == ^._id ${visibleFilter}] | order(date_time desc, _createdAt desc) {
        training_label,
        "slug": slug.current,
        date_time,
        summary,
        visible,
      },
    }`,
    { season: seasonSlug }
  );

  if (!seasonData.length || !seasonData[0].training_plans?.length) {
    error(404, 'No training plans found for the requested season.');
  }

  const season = seasonData[0];
  season.training_plans.forEach(plan => plan.date_text = formatDateText(plan.date_time));
  return season;
}

/**
 * @param seasonSlug Slug for the season being loaded, e.g. 'spring2025'
 * @param trainingSlug Slug for the training plan for the specific training being loaded, unique within the season
 * @param showHidden If true, shows all training plans, including those not marked visible
 * @returns The training in the specified season with the specified training label
 */
export async function loadTrainingPlan(seasonSlug: string, trainingSlug: string, showHidden: boolean): Promise<TrainingPlan> {
  const visibleFilter = showHidden ? '' : '&& visible';
  const trainingPlanData: TrainingPlan[] = await sanityClient.option.fetch(
      `*[_type == "training_plan" && season->slug.current == $season && slug.current == $training_label ${visibleFilter}] {
        training_label,
        "season": season->name,
        date_time,
        summary,
        visible,
        omit_timestamps,
        modules[]-> {
          type,
          title,
          "tags": [
            main_tag-> {
              name,
              "slug": slug.current,
              color,
            },
            ...additional_tags[]-> {
              name,
              "slug": slug.current,
              color,
            },
          ],
          minutes,
          short_text,
          detailed_text,
          advanced_text,
        },
      }`,
      {
        season: seasonSlug,
        training_label: trainingSlug,
      },
  );
  
  if (!trainingPlanData.length) {
    error(404, 'Requested training plan not found.')
  } else if (trainingPlanData.length > 1) {
    error(500, 'More than one training plan found.')
  }

  const trainingPlan = trainingPlanData[0];
  const moduleStartTime: Date = new Date(trainingPlan.date_time);
  trainingPlan.date_text = formatDateTextFromDate(moduleStartTime);

  if (!trainingPlan.omit_timestamps) {
    trainingPlan.modules.forEach(
        module => {
          module.start_time = formatTimeText(moduleStartTime);
          moduleStartTime.setMinutes(moduleStartTime.getMinutes() + module.minutes);
        }
    );
  }

  return trainingPlan;
}
