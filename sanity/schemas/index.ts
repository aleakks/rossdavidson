import { defineField, defineType } from 'sanity'

export const hero = defineType({
    name: 'hero',
    title: 'Home: Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'eyebrow',
            title: 'Eyebrow (Top Label)',
            type: 'string',
            initialValue: 'ROSS DAVIDSON'
        }),
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
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative Text',
                        description: 'Important for accessibility and SEO.',
                    })
                ]
            }],
            options: {
                layout: 'grid',
            },
        }),
    ],
})

// 5. New Category Schema (Dynamic Portfolio Filters)
export const category = defineType({
    name: 'category',
    title: 'Portfolio Category',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Display Title' }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug (URL/Filter ID)',
            options: { source: 'title' }
        }),
        defineField({
            name: 'order',
            type: 'number',
            title: 'Display Order',
            description: '1, 2, 3... Determines the order in the filter bar.',
            initialValue: 0
        }),
    ],
    orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }]
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
    ],
    preview: {
        prepare() {
            return {
                title: "Selected Works (The Stack)"
            }
        }
    }
})

export const about = defineType({
    name: 'about',
    title: 'Home: About Section',
    type: 'document',
    fields: [
        defineField({
            name: 'artistImage',
            type: 'image',
            title: 'Artist Portrait',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                })
            ]
        }),
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



// 6. New Global Settings Schema
export const settings = defineType({
    name: 'settings',
    title: 'Global Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'headerLinks',
            title: 'Header Navigation',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'label', type: 'string' }),
                    defineField({ name: 'url', type: 'string' })
                ]
            }]
        }),
        defineField({
            name: 'footerText',
            title: 'Footer Intro Text',
            type: 'text'
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'platform', type: 'string' }),
                    defineField({
                        name: 'url',
                        type: 'url',
                        validation: Rule => Rule.uri({ scheme: ['http', 'https', 'mailto'] })
                    })
                ]
            }]
        })
    ],
    preview: {
        prepare() {
            return {
                title: "Global Site Settings"
            }
        }
    }
})

// 2. GalleryProject Schema Update
export const galleryProject = defineType({
    name: 'galleryProject',
    title: 'Gallery: Project/Photo',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
        defineField({ name: 'client', type: 'string', title: 'Client Name' }),
        defineField({ name: 'location', type: 'string', title: 'Location' }),
        defineField({ name: 'altText', type: 'string', title: 'Alt Text' }),
        // CHANGED: Reference instead of string list
        defineField({
            name: 'categoryRef',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }]
        }),
        // Keeping old field temporarily for migration, will mark hidden or deprecated later
        defineField({
            name: 'category',
            title: 'Legacy Category (Deprecated)',
            type: 'string',
            hidden: true
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
        defineField({ name: 'primaryCallout', type: 'string', title: 'Primary Callout Text' }),
        defineField({
            name: 'clients',
            title: 'Client List (Ticker/Grid)',
            type: 'array',
            of: [{ type: 'string' }],
            initialValue: ["Mixmag", "DJ Mag", "Insomniac", "Defected", "Cercle", "Afterlife"]
        })
    ]
})

// 4. Contact/Settings Update (Keeping for specialized contact fields)
export const contact = defineType({
    name: 'contact',
    title: 'Settings: Contact & Licensing',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Contact Page Title', initialValue: "Let's Work" }),
        defineField({ name: 'description', type: 'text', title: 'Contact Page Description', initialValue: "Seeking projects that challenge the norm. Fashion, Music, Art Direction." }),
        defineField({ name: 'disclaimer', type: 'string', title: 'Disclaimer Text (Form Footer)', initialValue: "By submitting this form you acknowledge that great work takes time and energy." }),
        defineField({ name: 'status', type: 'string', title: 'Current Status', initialValue: 'Accepting New Projects' }),
        defineField({ name: 'email', type: 'string', title: 'Contact Email', initialValue: 'studio@rossdavidson.com' }),
        defineField({ name: 'capabilities', type: 'array', of: [{ type: 'string' }], title: 'Capabilities List (Sidebar)' }),
        defineField({ name: 'licensingText', type: 'text', title: 'Licensing & Rights Text' })
    ]
})
// 7. Legal/Policy Page Schema
export const legalPage = defineType({
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Page Title' }),
        defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
        defineField({
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [{ type: 'block' }]
        }),
        defineField({ name: 'updatedAt', type: 'date', title: 'Last Updated' })
    ]
})

export const liveEvent = defineType({
    name: 'liveEvent',
    title: 'Live Event Portfolio',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Event/Client Title' }),
        defineField({ name: 'location', type: 'string', title: 'Location' }),
        defineField({ name: 'date', type: 'date', title: 'Event Date' }),
        defineField({
            name: 'coverImage',
            type: 'image',
            title: 'Cover Image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', type: 'string', title: 'Alternative Text' })
            ]
        }),
        defineField({
            name: 'images',
            type: 'array',
            title: 'Event Gallery (Showcase up to 10+ images)',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({ name: 'alt', type: 'string', title: 'Alternative Text' })
                ]
            }]
        }),
        defineField({ name: 'order', type: 'number', title: 'Order', description: 'Used to sort events (1-12).' })
    ],
    orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }]
})

export const infoPage = defineType({
    name: 'infoPage',
    title: 'Info Page Settings',
    type: 'document',
    fields: [
        defineField({ name: 'approachTitle', type: 'string', title: 'Approach Title', initialValue: 'Approach' }),
        defineField({ name: 'approachDescription', type: 'text', title: 'Approach Description', initialValue: "A bespoke approach to capturing nightlife, music, and editorial fashion. I don't just document events; I create iconic imagery that defines brands." }),
        defineField({ name: 'investmentTitle', type: 'string', title: 'Investment Title', initialValue: 'Investment' }),
        defineField({ name: 'investmentDescription', type: 'text', title: 'Investment Description', initialValue: 'Because every project is unique, I provide bespoke quotes tailored to your specific requirements and usage rights.' }),
        defineField({ name: 'investmentCta', type: 'string', title: 'Investment CTA Button Label', initialValue: 'Request Rate Card' }),
        defineField({
            name: 'faqs',
            type: 'array',
            title: 'Common Questions (FAQs)',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'question', type: 'string', title: 'Question' }),
                    defineField({ name: 'answer', type: 'text', title: 'Answer' })
                ]
            }]
        })
    ],
    preview: {
        prepare() {
            return { title: 'Info Page Settings' }
        }
    }
})

export const livePage = defineType({
    name: 'livePage',
    title: 'Live Page Settings',
    type: 'document',
    fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow Label', initialValue: 'Collection / 01' }),
        defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Live & Touring' }),
        defineField({ name: 'subtitle', type: 'text', title: 'Subtitle Description', initialValue: 'Highlighting the 12 best live events. Click any event to open its folder and explore the full collection of detail shots from the night.' })
    ],
    preview: {
        prepare() {
            return { title: 'Live Page Settings' }
        }
    }
})

export const publicationsPage = defineType({
    name: 'publicationsPage',
    title: 'Publications Page Settings',
    type: 'document',
    fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow Label', initialValue: 'Collection / 02' }),
        defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Publications' }),
        defineField({ name: 'subtitle', type: 'text', title: 'Subtitle Description', initialValue: 'A curated archive of printed features, magazine covers, and digital editorials. This section is currently in production.' })
    ],
    preview: {
        prepare() {
            return { title: 'Publications Page Settings' }
        }
    }
})

export const publication = defineType({
    name: 'publication',
    title: 'Publication Link',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Publication Title (e.g. DJ Mag Feature)' }),
        defineField({ name: 'publisher', type: 'string', title: 'Publisher / Magazine Name' }),
        defineField({ name: 'url', type: 'url', title: 'External URL (Link to Publication)' }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Featured Image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', type: 'string', title: 'Alternative Text' })
            ]
        }),
        defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Button Label', initialValue: 'Read Article' }),
        defineField({ name: 'order', type: 'number', title: 'Order', description: 'Used to sort publications.' })
    ],
    orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }]
})


