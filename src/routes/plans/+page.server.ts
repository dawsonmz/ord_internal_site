import { toHTML } from "@portabletext/to-html";
import { createClient } from "@sanity/client";

interface Module {
    _id: String,
    name: String,
    title: String,
    order: Number,
    minutes: Number,
    text: [],

    // Computed fields:
    start_time: String,
    text_html: String,
}

interface TrainingPlan {
    _id: String,
    lesson_number: Number,
    date_time: Date,
    modules: String[],

    // Computed fields:
    date_text: String,
    module_objects: Module[],
}

const sanityClientCredentials = {
    option: createClient(
        {
            projectId: "vh55mhjn",
            dataset: "production_private",
            useCdn: true,
        }
    )
}

export async function load() {
    let [moduleData, trainingPlanData] = await Promise.all(
        [
            sanityClientCredentials.option.fetch(`*[_type == "module"]`),
            sanityClientCredentials.option.fetch(`*[_type == "training_plan"]`),
        ]
    );

    if (moduleData && trainingPlanData) {
        let modulesByName = new Map<String, Module>();
        moduleData.forEach(
            (module: Module) => {
                module.text_html = toHTML(module.text);
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
            }
        )

        return { training_plans: trainingPlanData };
    }

    return {
        status: 500,
        body: new Error("Internal server error"),
    };
}