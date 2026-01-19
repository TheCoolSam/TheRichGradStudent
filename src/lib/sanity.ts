import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Client for server-side data fetching
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Client with preview/draft mode support
// Note: This must only be called from Server Components
export function getClient(preview?: { token?: string }) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview,
    perspective: preview ? 'previewDrafts' : 'published',
    token: preview?.token || process.env.SANITY_API_TOKEN,
  })
}
