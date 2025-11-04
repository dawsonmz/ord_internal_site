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

const imageBuilder = imageUrlBuilder(sanityClient.option);

export function getSanityImageUrl(image: any, width?: number) {
  let imageUrlBuilder = imageBuilder.image(image);
  if (width) {
    imageUrlBuilder = imageUrlBuilder.width(width);
  }
  return imageUrlBuilder.url();
}
