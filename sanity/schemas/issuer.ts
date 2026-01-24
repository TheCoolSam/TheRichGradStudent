import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'issuer',
    title: 'Card Issuer',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Issuer Name',
            type: 'string',
            description: 'Name of the card issuer (e.g., Chase, American Express, Citi)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            description: 'URL-friendly version of the issuer name',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Issuer Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Logo image for the issuer',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which to display the issuer in filter lists (lower numbers appear first)',
            initialValue: 100,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo',
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})
