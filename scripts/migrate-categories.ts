import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

const CATEGORIES = [
    { title: 'Touring', slug: 'touring' },
    { title: 'Editorial', slug: 'editorial' },
    { title: 'Brand', slug: 'brand' }
]

const LEGACY_MAP: Record<string, string> = {
    'music': 'touring',
    'editorial': 'editorial',
    'commercial': 'brand',
    'personal': 'editorial', // Map personal to editorial for now to avoid orphan
    'brand': 'brand', // In case some already exist
    'touring': 'touring'
}

async function migrate() {
    try {
        console.log("Starting Category Migration...")
        const catMap: Record<string, string> = {}

        // 1. Create Categories
        for (const cat of CATEGORIES) {
            const doc = {
                _type: 'category',
                _id: `category-${cat.slug}`, // Deterministic ID
                title: cat.title,
                slug: { _type: 'slug', current: cat.slug }
            }
            const res = await client.createOrReplace(doc)
            console.log(`Ensured category: ${cat.title} (${res._id})`)
            catMap[cat.slug] = res._id
        }

        // 2. Migrate Projects
        const projects = await client.fetch(`*[_type == "galleryProject" && !defined(categoryRef)]`)
        console.log(`Found ${projects.length} projects to migrate...`)

        const transaction = client.transaction()

        for (const p of projects) {
            const legacyCat = p.category?.toLowerCase() || 'touring'
            const targetSlug = LEGACY_MAP[legacyCat] || 'touring' // Default to touring
            const targetId = catMap[targetSlug]

            if (targetId) {
                transaction.patch(p._id, patch =>
                    patch.set({
                        categoryRef: { _type: 'reference', _ref: targetId }
                    })
                )
            }
        }

        if (projects.length > 0) {
            await transaction.commit()
            console.log("Migration complete!")
        } else {
            console.log("No projects needed migration.")
        }

    } catch (e: any) {
        console.error("Migration failed:", e.message)
    }
}

migrate()
