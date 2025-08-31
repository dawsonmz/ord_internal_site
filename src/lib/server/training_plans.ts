import { InternalError, NotFoundError } from "$lib/server/errors";
import { sanityClient } from "$lib/server/sanity";
import { type Module, processImageResources } from "$lib/server/modules";

export interface Season {
  name: String,
  slug: String,
  training_plans: TrainingPlanSummary[],
}

export interface TrainingPlanSummary {
  training_label: String,
  slug: String,
  date_time: Date,
  summary: String,

  // Computed fields:
  date_text: String,
}

export interface TrainingPlan {
  training_label: String,
  season: String,
  date_time: Date,
  summary: String,
  modules: Module[],

  // Computed fields:
  date_text: String,
}

/**
 * @returns All seasons' names, slugs, and training plan summaries.
 */
export async function loadSeasons(): Promise<Season[]> {
  const seasonData: Season[] = await sanityClient.option.fetch(
      `*[_type == "season"] | order(_createdAt desc) {
        name,
        "slug": slug.current,
        training_plans[]-> {
          training_label,
          "slug": slug.current,
          date_time,
          summary,
        },
      }`
  );
  if (seasonData) {
    const seasons = seasonData.filter(season => season.training_plans);
    seasons.forEach(
        season => season.training_plans.forEach(
            plan => plan.date_text = formatDateText(new Date(plan.date_time))
        )
    );
    return seasons;
  } else {
    throw new InternalError("Failed to load season data");
  }
}

/**
 * @param seasonSlug Slug for the season being loaded, e.g. 'spring2025'
 * @param trainingSlug Slug for the training plan for the specific training being loaded, unique within the season
 * @returns The training in the specified season with the specified training label
 */
export async function loadTrainingPlan(seasonSlug: String, trainingSlug: String): Promise<TrainingPlan> {
  const trainingPlanData: TrainingPlan[] = await sanityClient.option.fetch(
      `*[_type == "training_plan"
          && _id in *[_type == "season" && slug.current == $season].training_plans[]._ref
          && slug.current == $training_label] {
        training_label,
        "season": *[_type == "season" && slug.current == $season][0].name,
        date_time,
        summary,
        modules[]->,
      }`,
      {
        season: seasonSlug,
        training_label: trainingSlug,
      },
  );

  if (!trainingPlanData) {
    throw new NotFoundError("Training plan not found");
  } else if (trainingPlanData.length > 1) {
    throw new InternalError("More than one training plan found.");
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
      "en-GB",
      {
        timeZone: "Europe/Oslo",
        weekday: "long",
      }
  );
  const day = date.toLocaleDateString(
      "en-GB",
      {
        timeZone: "Europe/Oslo",
        day: "numeric",
        month: "long",
      },
  );
  return `${weekday}, ${day}`;
}

function formatTimeText(date: Date): String {
  return date.toLocaleTimeString(
      "en-GB",
      {
        timeStyle: "short",
        timeZone: "Europe/Oslo",
      }
  );
}
