import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'size',
          type: 'string',
          title: 'Image Size',
          description: 'Choose how large this image should display',
          options: {
            list: [
              { title: 'Small (25%)', value: 'small' },
              { title: 'Medium (50%)', value: 'medium' },
              { title: 'Large (75%)', value: 'large' },
              { title: 'Full Width (100%)', value: 'full' },
            ],
            layout: 'radio',
          },
          initialValue: 'full',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the image',
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'New Here', value: 'new' },
          { title: 'Every Day Earning', value: 'everyday' },
          { title: 'Travel Cards', value: 'travel' },
          { title: 'Credit Card Pro', value: 'pro' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Mark as featured to show on homepage. Featured posts appear first, then filled with most recent.',
      initialValue: false,
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for search engines (150-160 characters)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'recommendedPosts',
      title: 'Recommended Content',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'article' }, { type: 'post' }, { type: 'creditCard' }] }
      ],
      description: '📌 Manually select 1-3 related articles, blog posts, or credit cards. If empty, automatically shows content with shared tags.',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
