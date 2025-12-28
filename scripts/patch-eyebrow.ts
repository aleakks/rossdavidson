import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

async function updateEyebrow() {
    try {
        console.log("Patching Hero document with Eyebrow field...")

        // Patch the Hero document using setIfMissing to avoid overwriting if user edited it
        // But user said "it isn't in sanity", so we probably need to set it.
        // We use 'set' to force it to "ROSS DAVIDSON" as the starting point.
        const patch = client.patch('hero')
            .set({
                eyebrow: "ROSS DAVIDSON"
            })

        const result = await patch.commit()
        console.log("Eyebrow field added successfully!", result.eyebrow)

    } catch (e: any) {
        console.error("Patching failed:", e.message)
    }
}

updateEyebrow()
