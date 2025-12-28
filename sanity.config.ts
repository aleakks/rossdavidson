/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

// import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { hero, photoStack, about, service, galleryProject, contact, socialProof, category, settings, legalPage, journal } from './sanity/schemas'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema: {
        types: [hero, photoStack, about, service, galleryProject, contact, socialProof, category, settings, legalPage, journal],
    },
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Website Content')
                    .items([
                        // 1. Global (Header/Footer)
                        S.listItem()
                            .title('Global Site Settings (Header & Footer)')
                            .child(S.document().schemaType('settings').documentId('settings')),

                        S.divider(),

                        // 2. Page Flow (Top to Bottom)
                        S.listItem()
                            .title('1. Hero Section (Top)')
                            .child(S.document().schemaType('hero').documentId('hero')),

                        S.listItem()
                            .title('2. Trusted By (Client Logos)')
                            .child(S.document().schemaType('socialProof').documentId('socialProof')),

                        S.listItem()
                            .title('3. Selected Works (The Stack)')
                            .child(S.document().schemaType('photoStack').documentId('photoStack')),

                        S.listItem()
                            .title('4. About Ross')
                            .child(S.document().schemaType('about').documentId('about')),

                        S.documentTypeListItem('galleryProject').title('5. Portfolio Gallery (All Projects)'),

                        S.documentTypeListItem('service').title('6. Services List'),

                        S.documentTypeListItem('journal').title('7. Journal / Blog'),

                        S.listItem()
                            .title('8. Contact Info & Rights')
                            .child(S.document().schemaType('contact').documentId('contact')),

                        S.divider(),

                        S.documentTypeListItem('legalPage').title('Legal / Policies'),

                        S.divider(),

                        // 3. Configuration
                        S.documentTypeListItem('category').title('Manage Portfolio Filters'),
                    ]),
        }),
        // Vision exists to query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin

    ],
})
