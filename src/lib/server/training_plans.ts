import { sanityClientCredentials } from "./sanity";
import { type Module, type ModuleRef, loadModules } from "./modules";
import { type SeasonRef } from "./seasons";

export interface TrainingPlan {
    _id: String,
    lesson_number: Number,
    season: SeasonRef,
    date_time: Date,
    modules: ModuleRef[],

    // Computed fields:
    date_text: String,
    module_objects: Module[],
}

/**
 * @returns A map where the key is a reference to the season, and the value is a list of training plans for that season.
 *          Training plans within a season are sorted in increasing order by lesson number.
 */
export async function loadTrainingPlans(): Promise<Map<String, TrainingPlan[]>> {
    let [moduleData, trainingPlanData] = await Promise.all(
        [
            loadModules(),
            sanityClientCredentials.option.fetch(`*[_type == "training_plan"]`),
        ]
    );

    if (moduleData && trainingPlanData) {
        let modulesById = new Map<String, Module>();
        moduleData.forEach(
            (module: Module) => {
                modulesById.set(module._id, module);
            }
        );

        let trainingPlansBySeasonId = new Map<String, TrainingPlan[]>();
        trainingPlanData.forEach(
            (trainingPlan: TrainingPlan) => {
                let moduleStartTime: Date = new Date(trainingPlan.date_time);
                trainingPlan.date_text = moduleStartTime.toLocaleDateString("no-NO");

                trainingPlan.module_objects = trainingPlan.modules.map(
                    (moduleRef: ModuleRef) => {
                        const module: Module = modulesById.get(moduleRef._ref)!;
                        let moduleCopy = {...module};
                        moduleCopy.start_time = moduleStartTime.toLocaleTimeString("no-NO", { timeStyle: "short" });
                        moduleStartTime.setMinutes(moduleStartTime.getMinutes() + module!.minutes.valueOf());
                        return moduleCopy;
                    }
                );

                if (!trainingPlansBySeasonId.has(trainingPlan.season._ref)) {
                    trainingPlansBySeasonId.set(trainingPlan.season._ref, []);
                }
                trainingPlansBySeasonId.get(trainingPlan.season._ref)!.push(trainingPlan);
            }
        )

        trainingPlansBySeasonId.forEach(
            (plans: TrainingPlan[], _seasonRef: String, _map: Map<String, TrainingPlan[]>) => {
                plans.sort((lhs, rhs) => lhs.lesson_number.valueOf() - rhs.lesson_number.valueOf());
            }
        );
        return trainingPlansBySeasonId;
    } else {
        throw new Error("Failed to load training plan data.");
    }
}
