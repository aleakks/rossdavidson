import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

async function populateSettings() {
    try {
        console.log("Populating Global Settings...")

        const settings = {
            _type: 'settings',
            _id: 'settings',
            headerLinks: [
                { label: "Home", url: "/" },
                { label: "Live", url: "/live" },
                { label: "Publications", url: "/publications" },
                { label: "About", url: "/#about" },
                { label: "Contact", url: "/contact" }
            ],
            footerText: "Capturing the energy of music and nightlife culture worldwide.",
            socialLinks: [
                { platform: "Instagram", url: "https://instagram.com" },
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Email", url: "mailto:studio@rossdavidson.com" }
            ]
        }

        const res = await client.createOrReplace(settings)
        console.log("Global settings created!", res._id)

    } catch (e: any) {
        console.error("Settings population failed:", e.message)
    }
}

populateSettings()
