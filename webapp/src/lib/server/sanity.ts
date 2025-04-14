import { createClient } from "@sanity/client";

export const sanityClientCredentials = {
    option: createClient(
        {
            projectId: "vh55mhjn",
            dataset: "production_private",
            useCdn: true,
        }
    )
};
