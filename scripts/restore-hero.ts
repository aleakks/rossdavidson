import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

async function restoreHero() {
    try {
        console.log("Starting restoration...")

        // 1. Fetch recent images (Updated to 24 per user request)
        // We assume the most recent 24 assets are the portfolio/hero ones.
        const images = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0...24]`)

        if (!images || images.length === 0) {
            console.error("No images found in dataset to restore.")
            return
        }

        console.log(`Found ${images.length} images to restore.`)

        // 2. Patch the Hero document
        const imageObjects = images.map((img: any) => ({
            _type: 'image',
            _key: Math.random().toString(36).substring(7), // Generate unique key
            asset: {
                _type: "reference",
                _ref: img._id
            }
        }))

        // Update Title (Remove London-based) and Images
        const patch = client.patch('hero')
            .set({
                title: "Music & Nightlife\nPhotographer",
                images: imageObjects
            })

        const result = await patch.commit()
        console.log("Hero restored successfully!", result)

    } catch (e: any) {
        console.error("Restoration failed:", e.message)
    }
}

restoreHero()
