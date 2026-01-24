import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { draftMode } from 'next/headers'

export default function VisualEditingComponent() {
  const { isEnabled } = draftMode()

  return isEnabled ? <VisualEditing /> : null
}
