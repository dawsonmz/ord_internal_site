import { loadModules } from "$lib/server/beginners/modules";

export async function load() {
    const modules = await loadModules();
    modules.sort((lhs, rhs) => lhs.order.valueOf() - rhs.order.valueOf());
    return { modules: modules };
}
