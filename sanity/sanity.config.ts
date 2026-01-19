import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemas'

const projectUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'The Rich Grad Student',

  projectId: '92vz1asq',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: projectUrl,
        previewMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        mainDocuments: (doc) => {
          if (doc._type === 'post') {
            return { type: 'post', id: doc._id }
          }
          if (doc._type === 'article') {
            return { type: 'article', id: doc._id }
          }
          if (doc._type === 'creditCard') {
            return { type: 'creditCard', id: doc._id }
          }
          return null
        },
        locations: {
          post: {
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/blog/${doc?.slug}`,
                },
              ],
            }),
          },
          article: {
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/articles/${doc?.slug}`,
                },
              ],
            }),
          },
          creditCard: {
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: `/cards/${doc?.slug}`,
                },
              ],
            }),
          },
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
