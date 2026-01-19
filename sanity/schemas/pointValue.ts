export default {
  name: 'pointValue',
  title: 'Point Values',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Maximize Your Points Value"'
    },
    {
      name: 'cards',
      title: 'Point Value Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Card/Program Name',
              type: 'string',
              description: 'e.g., "Chase", "Bilt", "Capital One"'
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'baseValue',
              title: 'Base Value (cents)',
              type: 'number',
              description: 'Base value in cents per point, e.g., 2 for 2¢'
            },
            {
              name: 'bestRedemption',
              title: 'Best Redemption Value (cents)',
              type: 'number',
              description: 'Best redemption value in cents, e.g., 7 for 7¢'
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which cards appear (1, 2, 3, etc.)'
            }
          ]
        }
      ]
    }
  ]
}
