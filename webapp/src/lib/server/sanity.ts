import { createClient } from "@sanity/client";
import { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET } from '$env/static/private';

export const sanityClientCredentials = {
    option: createClient(
        {
            projectId: SANITY_STUDIO_PROJECT_ID,
            dataset: SANITY_STUDIO_DATASET,
            useCdn: true,
        },
    ),
};
