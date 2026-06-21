/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

// import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { hero, photoStack, about, service, galleryProject, contact, socialProof, category, settings, legalPage, liveEvent, infoPage, livePage, publicationsPage, publication } from './sanity/schemas'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema: {
        types: [hero, photoStack, about, service, galleryProject, contact, socialProof, category, settings, legalPage, liveEvent, infoPage, livePage, publicationsPage, publication],
    },
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Website Content')
                    .items([
                        // Global Settings
                        S.listItem()
                            .title('Global Site Settings')
                            .child(S.document().schemaType('settings').documentId('settings')),

                        S.divider(),

                        // 1. Home Page
                        S.listItem()
                            .title('1. Home: Hero Section (Top)')
                            .child(S.document().schemaType('hero').documentId('hero')),

                        S.listItem()
                            .title('2. Home: Trusted By (Logos)')
                            .child(S.document().schemaType('socialProof').documentId('socialProof')),

                        S.listItem()
                            .title('3. Home: Selected Works (Stack)')
                            .child(S.document().schemaType('photoStack').documentId('photoStack')),

                        S.divider(),

                        // 2. Inner Pages
                        S.listItem()
                            .title('4. About Ross Page')
                            .child(S.document().schemaType('about').documentId('about')),

                        S.listItem()
                            .title('5a. Live Music Page Settings')
                            .child(S.document().schemaType('livePage').documentId('livePage')),

                        S.documentTypeListItem('liveEvent').title('5b. Live Event Folders (12 Events)'),

                        S.listItem()
                            .title('6a. Publications Page Settings')
                            .child(S.document().schemaType('publicationsPage').documentId('publicationsPage')),

                        S.documentTypeListItem('publication').title('6b. Publications List (8-10 Links)'),

                        S.listItem()
                            .title('7a. Info Page Settings & FAQs')
                            .child(S.document().schemaType('infoPage').documentId('infoPage')),

                        S.documentTypeListItem('service').title('7b. Services List'),

                        S.listItem()
                            .title('8. Contact Page & Form Settings')
                            .child(S.document().schemaType('contact').documentId('contact')),

                        S.divider(),

                        S.documentTypeListItem('legalPage').title('Legal / Policies'),
                    ]),
        }),
        // Vision exists to query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin

    ],
})
