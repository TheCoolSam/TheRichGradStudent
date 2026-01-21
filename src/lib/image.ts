import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './sanity'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}

/**
 * Optimized image URL builder with quality and format settings
 * @param source - Sanity image source
 * @param options - Image optimization options
 */
export function optimizedImageUrl(
  source: SanityImageSource,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  }
) {
  let imageBuilder = builder.image(source)
  
  if (options?.width) imageBuilder = imageBuilder.width(options.width)
  if (options?.height) imageBuilder = imageBuilder.height(options.height)
  if (options?.quality) imageBuilder = imageBuilder.quality(options.quality)
  if (options?.format) imageBuilder = imageBuilder.format(options.format)
  else imageBuilder = imageBuilder.auto('format') // Auto-detect best format
  
  return imageBuilder.fit('max').url()
}
