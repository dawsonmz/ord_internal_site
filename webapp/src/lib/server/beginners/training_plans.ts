import { InternalError, NotFoundError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";
import { type SeasonRef, loadSeasons } from "$lib/server/seasons";
import { type Module, type ModuleRef, loadModules } from "$lib/server/beginners/modules";

export interface TrainingPlan {
    _id: String,
    lesson_number: Number,
    season: SeasonRef,
    date_time: Date,
    summary: String,
    modules: ModuleRef[],

    // Computed fields:
    date_text: String,
    module_objects: Module[],
}

export interface TrainingPlanSummary {
    lesson_number: Number,
    season: SeasonRef,
    date_time: Date,
    summary: String,

    // Computed fields:
    date_text: String,
}

/**
 * @returns A map where the key is a reference to the season, and the value is a list of training plan summaries
 *          for that season. Training plan summaries within a season are sorted in increasing order by lesson number.
 */
export async function loadTrainingPlanSummaries(): Promise<Map<String, TrainingPlanSummary[]>> {
    const trainingPlanSummaryData: TrainingPlanSummary[] = await sanityClientCredentials.option.fetch(`*[_type == "training_plan"]`);
    if (!trainingPlanSummaryData) {
        throw new InternalError("Failed to load training plan data.");
    }

    const trainingPlanSummariesBySeasonId = new Map<String, TrainingPlanSummary[]>();
    trainingPlanSummaryData.forEach(
        (trainingPlanSummary: TrainingPlanSummary) => {
            const startTime: Date = new Date(trainingPlanSummary.date_time);
            trainingPlanSummary.date_text = formatDateText(startTime);
            if (!trainingPlanSummariesBySeasonId.has(trainingPlanSummary.season._ref)) {
                trainingPlanSummariesBySeasonId.set(trainingPlanSummary.season._ref, []);
            }
            trainingPlanSummariesBySeasonId.get(trainingPlanSummary.season._ref)!.push(trainingPlanSummary);
        }
    );

    trainingPlanSummariesBySeasonId.forEach(
        (plans: TrainingPlanSummary[], _seasonRef: String, _map: Map<String, TrainingPlanSummary[]>) => {
            plans.sort((lhs, rhs) => lhs.lesson_number.valueOf() - rhs.lesson_number.valueOf());
        }
    );
    return trainingPlanSummariesBySeasonId;
}

/**
 * @param seasonShortText The short_text field of the season where the training plan belongs, e.g. spring2025
 * @param lessonNumber The lesson number for the training plan, provided as a string
 * @returns The training plan with the given season and lesson number
 */
export async function loadTrainingPlan(seasonShortText: String, lessonNumber: String): Promise<TrainingPlan> {
    if (!lessonNumber.match(/^\d+$/)) {
        throw new NotFoundError("Training plan not found")
    }
    const [seasonData, moduleData] = await Promise.all(
        [
            loadSeasons(),
            loadModules(),
        ]
    );

    const season = seasonData.find((s => s.short_text === seasonShortText));
    if (!season) {
        throw new NotFoundError("Season not found");
    }

    const modulesById = new Map<String, Module>();
    moduleData.forEach(
        (module: Module) => {
            modulesById.set(module._id, module);
        }
    );

    const trainingPlanData: TrainingPlan[] = await sanityClientCredentials.option.fetch(
        `*[_type == "training_plan" && season._ref == "` + season._id + `" && lesson_number == ` + lessonNumber + `]`
    );
    if (!trainingPlanData.length) {
        throw new NotFoundError("Training plan not found");
    } else if (trainingPlanData.length > 1) {
        throw new InternalError("Multiple training plans with the same season and lesson number were found");
    }

    const trainingPlan = trainingPlanData[0];
    const moduleStartTime: Date = new Date(trainingPlan.date_time);
    trainingPlan.date_text = formatDateText(moduleStartTime);

    trainingPlan.module_objects = trainingPlan.modules.map(
        (moduleRef: ModuleRef) => {
            const module: Module = modulesById.get(moduleRef._ref)!;
            const moduleCopy = {...module};
            moduleCopy.start_time = moduleStartTime.toLocaleTimeString("no-NO", { timeStyle: "short" });
            moduleStartTime.setMinutes(moduleStartTime.getMinutes() + module!.minutes.valueOf());
            return moduleCopy;
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
