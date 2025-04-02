import { toHTML } from "@portabletext/to-html";
import { sanityClientCredentials } from "./sanity";

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

export async function loadModules(): Promise<Module[]> {
    let moduleData: Module[] = await sanityClientCredentials.option.fetch(`*[_type == "module"]`);
    if (moduleData) {
        moduleData.forEach(
            (module: Module) => {
                module.text_html = toHTML(module.text);
            }
        );
        return moduleData;
    } else {
        throw new Error("Failed to load module data.");
    }
}
