import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'subscriber',
    title: 'Subscribers',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Unsubscribed', value: 'unsubscribed' },
                    { title: 'Pending', value: 'pending' },
                ],
            },
            initialValue: 'active',
        }),
        defineField({
            name: 'subscribedAt',
            title: 'Subscribed At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            initialValue: 'website',
        }),
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'status',
        },
    },
})
