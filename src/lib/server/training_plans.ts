import { sanityClientCredentials } from "./sanity";
import { type Module, loadModules } from "./modules";

export interface TrainingPlan {
    _id: String,
    lesson_number: Number,
    season: String,
    date_time: Date,
    modules: String[],

    // Computed fields:
    date_text: String,
    module_objects: Module[],
}

/**
 * @returns A map where the key is the season, and the value is a list of training plans for that season.
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
        let trainingPlansBySeason = new Map<String, TrainingPlan[]>();

        let modulesByName = new Map<String, Module>();
        moduleData.forEach(
            (module: Module) => {
                modulesByName.set(module.name, module);
            }
        );

        trainingPlanData.forEach(
            (trainingPlan: TrainingPlan) => {
                let moduleStartTime: Date = new Date(trainingPlan.date_time);
                trainingPlan.date_text = moduleStartTime.toLocaleDateString("no-NO");

                trainingPlan.module_objects = trainingPlan.modules.map(
                    (moduleName: String) => {
                        const module: Module = modulesByName.get(moduleName)!;
                        let moduleCopy = {...module};
                        moduleCopy.start_time = moduleStartTime.toLocaleTimeString("no-NO", { timeStyle: "short" });
                        moduleStartTime.setMinutes(moduleStartTime.getMinutes() + module!.minutes.valueOf());
                        return moduleCopy;
                    }
                );

                if (!trainingPlansBySeason.has(trainingPlan.season)) {
                    trainingPlansBySeason.set(trainingPlan.season, []);
                }
                trainingPlansBySeason.get(trainingPlan.season)!.push(trainingPlan);
            }
        )

        trainingPlansBySeason.forEach(
            (plans: TrainingPlan[], _season: String, _map: Map<String, TrainingPlan[]>) => {
                plans.sort((lhs, rhs) => lhs.lesson_number.valueOf() - rhs.lesson_number.valueOf());
            }
        );
        return trainingPlansBySeason;
    } else {
        throw new Error("Failed to load training plan data.");
    }
}
