import { error } from '@sveltejs/kit';
import { type Module, processImageResources } from '$lib/server/modules';
import { sanityClient } from '$lib/server/sanity';

interface Season {
  name: String,
  slug: String,
  training_plans: TrainingPlanSummary[],
}

interface TrainingPlanSummary {
  training_label: String,
  slug: String,
  date_time: Date,
  summary: String,
  visible: Boolean,

  // Computed fields:
  date_text: String,
}

interface TrainingPlan {
  training_label: String,
  season: String,
  date_time: Date,
  summary: String,
  visible: Boolean,
  modules: Module[],

  // Computed fields:
  date_text: String,
}

/**
 * @param showHidden If true, shows all training plans, including those not marked visible
 * @returns All seasons' names, slugs, and training plan summaries.
 */
export async function loadSeasons(showHidden: boolean): Promise<Season[]> {
  const visibleFilter = showHidden ? '' : '&& visible';
  const seasonData: Season[] = await sanityClient.option.fetch(
    `*[_type == "season"] {
      name,
      "slug": slug.current,
      "training_plans": *[_type == "training_plan" && season._ref == ^._id ${visibleFilter}] | order(_createdAt asc) {
        training_label,
        "slug": slug.current,
        date_time,
        summary,
        visible,
      },
    }`
  );

  const seasons = seasonData.filter(season => season.training_plans?.length);
  seasons.forEach(
      season => season.training_plans.forEach(
          plan => plan.date_text = formatDateText(new Date(plan.date_time))
      )
  );
  return seasons;
}

/**
 * @param seasonSlug Slug for the season being loaded, e.g. 'spring2025'
 * @param trainingSlug Slug for the training plan for the specific training being loaded, unique within the season
 * @param showHidden If true, shows all training plans, including those not marked visible
 * @returns The training in the specified season with the specified training label
 */
export async function loadTrainingPlan(seasonSlug: String, trainingSlug: String, showHidden: boolean): Promise<TrainingPlan> {
  const visibleFilter = showHidden ? '' : '&& visible';
  const trainingPlanData: TrainingPlan[] = await sanityClient.option.fetch(
      `*[_type == "training_plan" && season->slug.current == $season && slug.current == $training_label ${visibleFilter}] {
        training_label,
        "season": season->name,
        date_time,
        summary,
        visible,
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
          resources,
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
  trainingPlan.date_text = formatDateText(moduleStartTime);

  trainingPlan.modules.forEach(
      module => {
        module.start_time = formatTimeText(moduleStartTime);
        moduleStartTime.setMinutes(moduleStartTime.getMinutes() + module.minutes.valueOf());
        processImageResources(module);
      }
  );

  return trainingPlan;
}

function formatDateText(date: Date): String {
  // Using en-GB formatting for English day-of-week and month names.
  const weekday = date.toLocaleDateString(
      'en-GB',
      {
        timeZone: 'Europe/Oslo',
        weekday: 'long',
      }
  );
  const day = date.toLocaleDateString(
      'en-GB',
      {
        timeZone: 'Europe/Oslo',
        day: 'numeric',
        month: 'long',
      },
  );
  return `${weekday}, ${day}`;
}

function formatTimeText(date: Date): String {
  return date.toLocaleTimeString(
      'en-GB',
      {
        timeStyle: 'short',
        timeZone: 'Europe/Oslo',
      }
  );
}
