/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { hero, photoStack, about, service, galleryProject, contact, socialProof } from './sanity/schemas'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema: {
        types: [hero, photoStack, about, service, galleryProject, contact, socialProof],
    },
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        // Singleton Items (One-off pages/sections)
                        S.listItem()
                            .title('Home: Hero Section')
                            .child(S.document().schemaType('hero').documentId('hero')),
                        S.listItem()
                            .title('Home: Selected Works (The Stack)')
                            .child(S.document().schemaType('photoStack').documentId('photoStack')),
                        S.listItem()
                            .title('Home: About Section')
                            .child(S.document().schemaType('about').documentId('about')),
                        S.listItem()
                            .title('Settings: Contact & Info')
                            .child(S.document().schemaType('contact').documentId('contact')),
                        S.listItem()
                            .title('Settings: Client List')
                            .child(S.document().schemaType('socialProof').documentId('socialProof')),

                        S.divider(),

                        // List Items (Multiple documents)
                        S.documentTypeListItem('galleryProject').title('Gallery Projects'),
                        S.documentTypeListItem('service').title('Services List'),
                    ]),
        }),
        // Vision exists to query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
    ],
})
