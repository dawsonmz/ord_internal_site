import { toHTML } from "@portabletext/to-html";
import { InternalError } from "$lib/server/errors";
import { sanityClientCredentials } from "$lib/server/sanity";

export interface Module {
    _id: String,
    _createdAt: String,
    name: String,
    title: String,
    category: String,
    minutes: Number,
    short_text: [],
    detailed_text: [],

    // Computed fields:
    start_time: String,
    short_text_html: String,
    detailed_text_html: String,
}

export interface ModuleRef {
    _ref: String,
}

export async function loadModules(): Promise<Module[]> {
    const moduleData: Module[] = await sanityClientCredentials.option.fetch(`*[_type == "module"]`);
    if (moduleData) {
        moduleData.forEach(
            (module: Module) => {
                module.short_text_html = toHTML(module.short_text);
                module.detailed_text_html = toHTML(module.detailed_text);
            }
        );
        return moduleData;
    } else {
        throw new InternalError("Failed to load module data.");
    }
}
