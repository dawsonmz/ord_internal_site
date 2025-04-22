import { type Module, loadModules } from "$lib/server/modules";

export async function load({ params }) {
    const modules = await loadModules();
    const modulesInCategory = modules.filter((module) => module.module_category.short_text === params.category);

    if (modulesInCategory.length) {
        return {
            modules: modulesInCategory,
        };
    }

    return {
        status: 404,
        body: "No modules in the specified category were found",
    };
}
