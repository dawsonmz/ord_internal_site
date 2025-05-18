import { InternalError, NotFoundError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";
import { type Module, processImageResources } from "$lib/server/modules";

export interface Season {
  name: String,
  slug: String,
  num_trainings: number,
}

export interface TrainingPlansInSeason {
  season: String,
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
 * @returns All seasons' names and slugs, not including the individual training plans
 */
export async function loadSeasons(): Promise<Season[]> {
  const seasonData: Season[] = await sanityClientCredentials.option.fetch(
      `*[_type == "season"] | order(_createdAt desc) {
        name,
        "slug": slug.current,
        "num_trainings": count(training_plans),
      }`
  );
  if (seasonData) {
    seasonData.forEach(
        season => {
          if (!season.num_trainings) {
            season.num_trainings = 0;
          }
        }
    );
    return seasonData;
  } else {
    throw new InternalError("Failed to load season data");
  }
}

/**
 * @param seasonSlug Slug for the season being loaded, e.g. 'spring2025'
 * @returns The summaries of training plans in the specified season
 */
export async function loadTrainingPlansInSeason(seasonSlug: String): Promise<TrainingPlansInSeason> {
  const trainingPlanData: TrainingPlansInSeason[] = await sanityClientCredentials.option.fetch(
      `*[_type == "season" && slug.current == $season] {
        "season": name,
        training_plans[]-> {
          training_label,
          "slug": slug.current,
          date_time,
          summary,
        },
      }`,
      { season: seasonSlug },
  );
  if (!trainingPlanData) {
    throw new InternalError("Failed to load training plan data.");
  } else if (trainingPlanData.length > 1) {
    throw new InternalError("More than one season found.");
  }

  const trainingPlan = trainingPlanData[0];
  trainingPlan.training_plans?.forEach(summary => summary.date_text = formatDateText(new Date(summary.date_time)));

  return trainingPlan;
}

/**
 * @param seasonSlug Slug for the season being loaded, e.g. 'spring2025'
 * @param trainingSlug Slug for the training plan for the specific training being loaded, unique within the season
 * @returns The training in the specified season with the specified training label
 */
export async function loadTrainingPlan(seasonSlug: String, trainingSlug: String): Promise<TrainingPlan> {
  const trainingPlanData: TrainingPlan[] = await sanityClientCredentials.option.fetch(
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
  return date.toLocaleDateString(
      "en-GB",
      {
        dateStyle: "full",
        timeZone: "Europe/Oslo",
      }
  );
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
