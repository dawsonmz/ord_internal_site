import { type Module, loadModules } from "$lib/server/beginners/modules";

export async function load() {
    const modules = await loadModules();

    const modulesByCategory = new Map<String, Module[]>();
    modules.forEach(
        (module: Module) => {
            if (!modulesByCategory.has(module.category)) {
                modulesByCategory.set(module.category, []);
            }
            modulesByCategory.get(module.category)!.push(module);
        }
    );

    modulesByCategory.forEach(
        (moduleList: Module[], _category: String, _map: Map<String, Module[]>) => {
            moduleList.sort((lhs, rhs) => lhs._createdAt.localeCompare(rhs._createdAt.valueOf()));
        }
    );

    return { modulesByCategory: modulesByCategory };
}
