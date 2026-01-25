import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the author',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "Business and Personal Credit Card Expert"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'school',
      title: 'School/University',
      type: 'string',
      description: 'e.g., "PhD Student at Rice University"',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Professional headshot (recommend 400x400px)',
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
          initialValue: 'medium',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Short biography or introduction',
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List areas of expertise (e.g., "Chase Ultimate Rewards", "Luxury Travel")',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials/Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List professional credentials or academic degrees)',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'website', title: 'Personal Website', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
