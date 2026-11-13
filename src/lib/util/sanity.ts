import imageUrlBuilder from '@sanity/image-url';

export const SANITY_PROJECT_ID = 'vh55mhjn';
export const SANITY_DATASET = 'internal';
export const SANITY_API_VERSION = '2025-04-15';

// Image assets are served from the public Sanity CDN regardless of dataset visibility, so no token is needed here.
// This file is imported by client-side components, so it should not reference the read token.
const imageBuilder = imageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export function getSanityImageUrl(image: any, width?: number) {
  let imageUrlBuilder = imageBuilder.image(image);
  if (width) {
    imageUrlBuilder = imageUrlBuilder.width(width);
  }
  return imageUrlBuilder.url();
}
