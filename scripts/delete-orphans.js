const { createClient } = require('@sanity/client')

const client = createClient({
    projectId: 's7aj2kcx',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'sk2z3X8y4X9w0u1v5A6b7C8d9E0f1G2h3I4j5K6l7M8n9O0p1Q2r3S4t5U6v7W8x9Y0z1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3A4B5C6D7E8F9G0', // Placeholder token, user needs to run or I need real token. 
    // Wait, I don't have the token. I can't delete without it.
    // I will use `sanity documents delete` CLI command instead of script!
})

// Actually, I'll output the IDs to a file and tell user to delete, or use `npx sanity documents delete`
// `npx sanity documents delete id1 id2 ...`
// This is safer and doesn't require hardcoding token.
