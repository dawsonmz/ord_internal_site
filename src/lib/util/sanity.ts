import type { ImageUrlBuilder } from 'sanity';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = {
  option: createClient(
      {
        projectId: 'vh55mhjn',
        dataset: 'internal',
        useCdn: true,
        apiVersion: '2025-04-15',
      },
  ),
};

let imageBuilder: ImageUrlBuilder | null = null;

function getImageBuilder(): ImageUrlBuilder {
  if (!imageBuilder) {
    imageBuilder = imageUrlBuilder(sanityClient.option);
  }
  return imageBuilder;
}

export function getSanityImageUrl(image: any, width: number) {
  return getImageBuilder().image(image).width(width).url();
}
