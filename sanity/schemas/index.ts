import { defineField, defineType } from 'sanity'

export const hero = defineType({
    name: 'hero',
    title: 'Home: Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Main Title',
            type: 'string',
            initialValue: 'ROSS\nDAVIDSON'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            initialValue: 'Music & Nightlife Photography'
        }),
        defineField({
            name: 'images',
            title: 'Background Montage Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            options: {
                layout: 'grid',
            },
        }),
    ],
})

export const photoStack = defineType({
    name: 'photoStack',
    title: 'Home: Selected Works (Stack)',
    type: 'document',
    fields: [
        defineField({
            name: 'cards',
            title: 'Photo Cards (Ordered)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'image', type: 'image', title: 'Photo', options: { hotspot: true } }),
                        defineField({ name: 'client', type: 'string', title: 'Client Name' }),
                        defineField({ name: 'location', type: 'string', title: 'Location' }),
                        defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
                    ],
                    preview: {
                        select: {
                            title: 'client',
                            subtitle: 'location',
                            media: 'image'
                        }
                    }
                }
            ]
        })
    ]
})

export const about = defineType({
    name: 'about',
    title: 'Home: About Section',
    type: 'document',
    fields: [
        defineField({ name: 'artistImage', type: 'image', title: 'Artist Portrait', options: { hotspot: true } }),
        defineField({ name: 'headline', type: 'string', title: 'Main Headline' }),
        defineField({ name: 'bio', type: 'text', title: 'Biography (Text)' }),
        defineField({ name: 'philosophy', type: 'text', title: 'Philosophy Quote' }),
        defineField({ name: 'signature', type: 'string', title: 'Signature Name', initialValue: 'Ross Davidson' }),
    ]
})

// 1. Service Schema Update
export const service = defineType({
    name: 'service',
    title: 'Service / Capability',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Service Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }), // Added description
        defineField({ name: 'order', title: 'Order (1-10)', type: 'number' }),
    ],
    orderings: [{ title: 'Order ASC', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }]
})

// 2. GalleryProject Schema Update
export const galleryProject = defineType({
    name: 'galleryProject',
    title: 'Gallery: Project/Photo',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
        defineField({ name: 'client', type: 'string', title: 'Client Name' }), // Added
        defineField({ name: 'location', type: 'string', title: 'Location' }), // Added
        defineField({ name: 'altText', type: 'string', title: 'Alt Text' }), // Added
        defineField({
            name: 'category',
            type: 'string',
            options: {
                list: [
                    { title: 'Editorial', value: 'editorial' },
                    { title: 'Music', value: 'music' },
                    { title: 'Commercial', value: 'commercial' },
                    { title: 'Personal', value: 'personal' }
                ]
            }
        }),
        defineField({ name: 'date', type: 'date', title: 'Date Shot' }),
    ]
})

// 3. Social Proof Update
export const socialProof = defineType({
    name: 'socialProof',
    title: 'Settings: Social Proof',
    type: 'document',
    fields: [
        defineField({ name: 'primaryCallout', type: 'string', title: 'Primary Callout Text' }), // Added
        defineField({
            name: 'clients',
            title: 'Client List (Ticker/Grid)',
            type: 'array',
            of: [{ type: 'string' }],
            initialValue: ["Mixmag", "DJ Mag", "Insomniac", "Defected", "Cercle", "Afterlife"] // Updated
        })
    ]
})

// 4. Contact/Settings Update for Licensing
export const contact = defineType({
    name: 'contact',
    title: 'Settings: Contact & Licensing',
    type: 'document',
    fields: [
        defineField({ name: 'status', type: 'string', title: 'Current Status', initialValue: 'Accepting New Projects' }),
        defineField({ name: 'email', type: 'string', title: 'Contact Email', initialValue: 'studio@rossdavidson.com' }),
        defineField({ name: 'capabilities', type: 'array', of: [{ type: 'string' }], title: 'Capabilities List (Sidebar)' }),
        defineField({ name: 'licensingText', type: 'text', title: 'Licensing & Rights Text' }) // Added
    ]
})
