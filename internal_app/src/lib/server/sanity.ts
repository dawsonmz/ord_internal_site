import { createClient } from "@sanity/client";

export const sanityClientCredentials = {
    option: createClient(
        {
            projectId: 'vh55mhjn',
            dataset: 'internal',
            useCdn: true,
        },
    ),
};
