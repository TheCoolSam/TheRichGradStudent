export default {
  name: 'pointValue',
  title: 'Point Values',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Heading for the points value carousel',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'cards',
      title: 'Point Value Cards',
      type: 'array',
      description: 'Add all points programs to display in the carousel',
      validation: (Rule: any) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'pointCard',
          title: 'Points Program',
          fields: [
            {
              name: 'name',
              title: 'Program Name',
              type: 'string',
              description: 'Name of points program (e.g., "Chase Ultimate Rewards")',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {
                hotspot: true
              },
              description: 'Program logo (recommend square format, 200x200px)',
              validation: (Rule: any) => Rule.required(),
              fields: [
                {
                  name: 'size',
                  type: 'string',
                  title: 'Image Size',
                  description: 'Choose how large this image should display',
                  options: {
                    list: [
                      {title: 'Small (25%)', value: 'small'},
                      {title: 'Medium (50%)', value: 'medium'},
                      {title: 'Large (75%)', value: 'large'},
                      {title: 'Full Width (100%)', value: 'full'},
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
            },
            {
              name: 'baseValue',
              title: 'Base Value (cents per point)',
              type: 'number',
              description: 'Typical redemption value (e.g., 1.25 for 1.25¢)',
              validation: (Rule: any) => Rule.required().min(0).max(100)
            },
            {
              name: 'bestRedemption',
              title: 'Best Redemption (cents per point)',
              type: 'number',
              description: 'Maximum value with optimal redemption (e.g., 2.5 for 2.5¢)',
              validation: (Rule: any) => Rule.required().min(0).max(100)
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Position in carousel (lower numbers appear first)',
              validation: (Rule: any) => Rule.required().min(1)
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'baseValue',
              media: 'logo'
            },
            prepare({ title, subtitle }: any) {
              return {
                title: title,
                subtitle: `Base: ${subtitle}¢ per point`
              }
            }
          }
        }
      ]
    }
  ]
}
