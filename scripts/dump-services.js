const { createClient } = require('@sanity/client')
const fs = require('fs')

const client = createClient({
    projectId: 's7aj2kcx',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function dumpServices() {
    const query = `*[_type == "service"]{_id, title, description}`
    try {
        const services = await client.fetch(query)
        fs.writeFileSync('services-list.json', JSON.stringify(services, null, 2))
        console.log("Services dumped to services-list.json")
    } catch (e) {
        console.error("Error:", e.message)
    }
}

dumpServices()
