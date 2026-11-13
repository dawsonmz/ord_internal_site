import { createClient, type SanityClient } from '@sanity/client';
import { env } from '$env/dynamic/private';
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from '$lib/util/sanity';

let sanityClient: SanityClient | null = null;

// $env/dynamic/private is only populated once a request is being handled.
export function getSanityClient(): SanityClient {
  if (!sanityClient) {
    const token = env.SANITY_READ_TOKEN;
    if (!token) {
      throw new Error(
          `SANITY_READ_TOKEN is not set; the '${SANITY_DATASET}' Sanity dataset is private and requires a read token`
      );
    }

    sanityClient = createClient(
        {
          projectId: SANITY_PROJECT_ID,
          dataset: SANITY_DATASET,
          apiVersion: SANITY_API_VERSION,
          useCdn: true,
          perspective: 'published',
          token,
        },
    );
  }

  return sanityClient;
}
