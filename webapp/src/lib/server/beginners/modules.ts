import { toHTML } from "@portabletext/to-html";
import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface Module {
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

export interface ModuleRef {
    _ref: String,
}

export async function loadModules(): Promise<Module[]> {
    const moduleData: Module[] = await sanityClientCredentials.option.fetch(`*[_type == "module"]`);
    if (moduleData) {
        moduleData.forEach(
            (module: Module) => {
                module.text_html = toHTML(module.text);
            }
        );
        return moduleData;
    } else {
        throw new InternalError("Failed to load module data.");
    }
}
