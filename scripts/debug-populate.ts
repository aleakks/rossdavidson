import { createClient } from 'next-sanity'
import * as fs from 'fs'
import * as path from 'path'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

async function main() {
    console.log("----------------------------------------")
    console.log("🚀 Starting Debug Population Script")
    console.log("----------------------------------------")

    try {
        // 1. Services
        const services = [
            "Creative Direction",
            "Art Direction",
            "Photography",
            "Videography",
            "Post-Production",
            "Brand Consultancy"
        ]

        console.log(`\n📦 Creating ${services.length} Services...`)
        for (let i = 0; i < services.length; i++) {
            const doc = {
                _id: `service-${i}`,
                _type: "service",
                title: services[i],
                order: i + 1
            }
            try {
                // Using create instead of createOrReplace to see if errors pop up
                await client.createOrReplace(doc)
                console.log(`   ✅ Service Created: ${doc.title}`)
            } catch (err: any) {
                console.error(`   ❌ Failed Service ${i}:`, err.message)
            }
        }

        // 2. Gallery
        const photosDir = path.join(process.cwd(), 'content', 'photos')
        if (fs.existsSync(photosDir)) {
            const files = fs.readdirSync(photosDir).filter(f => f.endsWith('.md'))
            console.log(`\n📸 Found ${files.length} gallery files locally.`)

            if (files.length === 0) {
                console.warn("   ⚠️ No markdown files found in content/photos!")
            }

            for (const file of files) {
                const content = fs.readFileSync(path.join(photosDir, file), 'utf-8')
                // Simple regex parsing
                const titleMatch = content.match(/title: "(.*)"/)
                const dateMatch = content.match(/date: "(.*)"/)
                const categoryMatch = content.match(/category: "(.*)"/)

                let category = categoryMatch ? categoryMatch[1].toLowerCase() : 'personal'
                if (!['editorial', 'music', 'commercial', 'personal'].includes(category)) {
                    category = 'personal'
                }

                const doc = {
                    _id: `gallery-${file.replace('.md', '')}`,
                    _type: "galleryProject",
                    title: titleMatch ? titleMatch[1] : 'Untitled',
                    date: dateMatch ? dateMatch[1] : new Date().toISOString(),
                    category: category
                }

                try {
                    await client.createOrReplace(doc)
                    console.log(`   ✅ Gallery Item Created: ${doc.title} (${doc._id})`)
                } catch (err: any) {
                    console.error(`   ❌ Failed Gallery Item ${file}:`, err.message)
                }
            }
        } else {
            console.error("\n❌ content/photos directory NOT found!")
        }

        // 3. Photo Stack
        console.log("\n📚 Creating Photo Stack...")
        const stackDoc = {
            _id: "photoStack",
            _type: "photoStack",
            cards: [
                { _key: '1', client: 'Vogue Italia', location: 'Milan', alt: 'Fashion Week' },
                { _key: '2', client: 'Adidas Originals', location: 'London', alt: 'Campaign' },
                { _key: '3', client: 'Rolling Stone', location: 'New York', alt: 'Cover Shoot' },
                { _key: '4', client: 'Printworks', location: 'London', alt: 'Season Closing' },
                { _key: '5', client: 'Sonar Festival', location: 'Barcelona', alt: 'Main Stage' },
                { _key: '6', client: 'Dazed & Confused', location: 'Berlin', alt: 'Editorial' },
                { _key: '7', client: 'Nike', location: 'Tokyo', alt: 'Air Max Day' },
                { _key: '8', client: 'Boiler Room', location: 'Worldwide', alt: 'Stream' },
            ]
        }
        try {
            await client.createOrReplace(stackDoc)
            console.log("   ✅ Photo Stack Created.")
        } catch (err: any) {
            console.error("   ❌ Failed Photo Stack:", err.message)
        }

    } catch (globalErr: any) {
        console.error("❌ CRITICAL SCRIPT ERROR:", globalErr.message)
    }
}

main()
