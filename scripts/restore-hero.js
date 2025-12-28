const { createClient } = require('@sanity/client')

const client = createClient({
    projectId: 's7aj2kcx',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    // When running with `npx sanity exec --with-user-token`, the token is in process.env.SANITY_TOKEN
    token: process.env.SANITY_TOKEN
})

async function restoreHero() {
    try {
        // 1. Fetch recent images to use as restoration candidates
        // We look for images that are NOT user profile pics or project thumbnails if possible, 
        // but generic 'sanity.imageAsset' query is broad. 
        // We will take the last 5 uploaded images as a best guess for the montage.
        const images = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0...5]`)

        if (!images || images.length === 0) {
            console.error("No images found in dataset to restore.")
            return
        }

        console.log(`Found ${images.length} images to restore.`)

        // 2. Patch the Hero document
        const imageObjects = images.map(img => ({
            _type: 'image',
            asset: {
                _type: "reference",
                _ref: img._id
            }
        }))

        // Update Title and Images
        const patch = client.patch('hero')
            .set({
                title: "Music & Nightlife\nPhotographer", // Removed "London-Based"
                images: imageObjects
            })

        const result = await patch.commit()
        console.log("Hero restored!", result)

    } catch (e) {
        console.error("Restoration failed:", e.message)
    }
}

restoreHero()
