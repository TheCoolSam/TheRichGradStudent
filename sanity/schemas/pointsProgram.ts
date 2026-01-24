import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pointsProgram',
  title: 'Points Program',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Program Name',
      type: 'string',
      description: 'Name of points program (e.g., "Chase Ultimate Rewards")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'URL-friendly version (auto-generated from program name)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Program logo (recommend square format, 200x200px)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'baseValue',
      title: 'Base Value (cents per point)',
      type: 'number',
      description: 'Typical redemption value (e.g., 1.25 for 1.25¢)',
      validation: (Rule) => Rule.required().min(0).max(100)
    }),
    defineField({
      name: 'bestRedemption',
      title: 'Best Redemption (cents per point)',
      type: 'number',
      description: 'Maximum value with optimal redemption (e.g., 2.5 for 2.5¢)',
      validation: (Rule) => Rule.required().min(0).max(100)
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Position in carousel (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'description',
      title: 'Program Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the points program and its benefits'
    }),
    defineField({
      name: 'showInCarousel',
      title: 'Show in Points Value Carousel',
      type: 'boolean',
      description: 'Enable to display this program in the homepage points carousel. Disable for cash back cards or programs without transferable points.',
      initialValue: true
    }),
    defineField({
      name: 'bestRedemptionLink',
      title: 'Best Redemption Link',
      type: 'reference',
      to: [{ type: 'article' }, { type: 'post' }, { type: 'creditCard' }],
      description: 'Optional: Link to content explaining how to get this Best Redemption value'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'baseValue',
      media: 'logo'
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: `Base: ${subtitle}¢ per point`
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})
