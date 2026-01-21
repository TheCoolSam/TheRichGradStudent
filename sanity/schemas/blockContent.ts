import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            title: 'Credit Card Link',
            name: 'creditCardLink',
            type: 'object',
            icon: () => '💳',
            fields: [
              {
                title: 'Credit Card',
                name: 'creditCard',
                type: 'reference',
                to: [{type: 'creditCard'}],
                description: 'Select a credit card review to link to',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
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
    defineArrayMember({
      name: 'creditCardBlock',
      title: 'Credit Card Display',
      type: 'object',
      icon: () => '💳',
      fields: [
        {
          name: 'creditCard',
          title: 'Credit Card',
          type: 'reference',
          to: [{type: 'creditCard'}],
          description: 'Select a credit card to display',
        },
        {
          name: 'showImage',
          title: 'Show Card Image',
          type: 'boolean',
          description: 'Display the credit card image',
          initialValue: true,
        },
        {
          name: 'imageSize',
          title: 'Image Size',
          type: 'string',
          description: 'Choose how large the card image should display',
          options: {
            list: [
              {title: 'Small (200px)', value: 'small'},
              {title: 'Medium (300px)', value: 'medium'},
              {title: 'Large (400px)', value: 'large'},
            ],
            layout: 'radio',
          },
          initialValue: 'medium',
          hidden: ({parent}) => !parent?.showImage,
        },
        {
          name: 'showDetails',
          title: 'Show Card Details',
          type: 'boolean',
          description: 'Display card name and key info below image',
          initialValue: false,
        },
      ],
      preview: {
        select: {
          title: 'creditCard.name',
          media: 'creditCard.image',
          showImage: 'showImage',
        },
        prepare({title, media, showImage}) {
          return {
            title: title || 'Credit Card Display',
            subtitle: showImage ? 'With image' : 'No image',
            media: media,
          }
        },
      },
    }),
  ],
})
