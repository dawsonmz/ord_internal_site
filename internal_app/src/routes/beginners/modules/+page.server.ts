import { type Module, loadModules } from "$lib/server/beginners/modules";

export async function load() {
    const modules = await loadModules();

    const categories = new Array<String>();
    const modulesByCategory = new Map<String, Module[]>();
    modules.forEach(
        (module: Module) => {
            if (!modulesByCategory.has(module.category)) {
                categories.push(module.category);
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

    return {
        categories: categories,
        modules_by_category: modulesByCategory,
    };
}
