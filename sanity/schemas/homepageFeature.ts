import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepageFeature',
  title: 'Homepage Featured Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      description: 'Internal title to identify this feature in the list',
    }),
    defineField({
      name: 'content',
      title: 'Content to Feature',
      type: 'reference',
      to: [
        { type: 'article' },
        { type: 'post' },
        { type: 'creditCard' },
      ],
      description: 'Select an article, blog post, or credit card to feature on the homepage',
    }),
    defineField({
      name: 'excerpt',
      title: 'Custom Excerpt',
      type: 'text',
      description: 'Optional custom excerpt. If not provided, will use the content\'s description or first 150 characters of body.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 1, 2, 3, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      contentTitle: 'content.title',
      image: 'content.mainImage',
    },
    prepare(selection) {
      const { title, contentTitle, image } = selection
      return {
        title: title || contentTitle || 'Untitled Feature',
        media: image,
      }
    },
  },
})
