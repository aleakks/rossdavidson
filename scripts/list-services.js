const { createClient } = require('@sanity/client')

const client = createClient({
    projectId: 's7aj2kcx',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    // We need a token to Read if dataset is private, but production is usually public read.
    // If it fails, I'll ask user for token or use .env
})

async function listServices() {
    const query = `*[_type == "service"]{_id, title}`
    try {
        const services = await client.fetch(query)
        console.log("Current Services in Sanity:")
        services.forEach(s => {
            console.log(`- ID: ${s._id} | Title: ${s.title}`)
        })
    } catch (e) {
        console.error("Error fetching services:", e.message)
    }
}

listServices()
