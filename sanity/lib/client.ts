import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
})

console.log("Sanity Client Config:", {
    projectId: projectId?.slice(0, 4) + '***',
    dataset,
    useCdn
});
