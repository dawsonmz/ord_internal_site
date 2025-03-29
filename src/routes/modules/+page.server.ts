import { toHTML } from "@portabletext/to-html";
import { createClient } from "@sanity/client";

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
    let data = await sanityClientCredentials.option.fetch(`*[_type == "module"]`);
    if (data) {
        data.forEach(
            (module: { text: [], text_html: String; }) => {
                module.text_html = toHTML(module.text);
            }
        );
        return {
            modules: data
        };
    }
    return {
        status: 500,
        body: new Error("Internal server error"),
    };
}