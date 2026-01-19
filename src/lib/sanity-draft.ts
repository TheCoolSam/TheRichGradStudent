import { draftMode } from 'next/headers'
import { getClient } from './sanity'

/**
 * Get a Sanity client that respects draft mode
 * This must only be called from Server Components
 */
export async function getDraftClient() {
  const { isEnabled } = draftMode()
  
  if (isEnabled) {
    return getClient({ token: process.env.SANITY_API_TOKEN })
  }
  
  return getClient()
}
