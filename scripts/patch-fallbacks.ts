import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
    // 1. Hero
    console.log("Patching Hero...");
    await client.patch('hero')
        .setIfMissing({
            eyebrow: "Ross Davidson",
            title: "London-Based\nMusic & Nightlife\nPhotographer",
            subtitle: "Touring, editorial and commercial photography for artists, labels and culture-led brands."
        })
        .commit();

    // 2. About
    console.log("Patching About...");
    await client.patch('about')
        .setIfMissing({
            headline: "Capturing the Electricity of the Moment.",
            bio: "I work with artists, labels and brands who need fast, reliable photography in high-pressure, low-light environments — from tours and festivals to editorial and commercial campaigns. My focus is on delivering authentic, high-impact imagery that defines artist identity.",
            philosophy: "The image is the only thing that lasts.",
            signature: "Ross Davidson"
        })
        .commit();

    // 3. Live Page
    console.log("Patching Live Page...");
    // Overriding Live Page Title to 'Live' just to fix their previous issue as well
    await client.patch('livePage')
        .set({ title: "Live" })
        .setIfMissing({
            eyebrow: "Collection / 01",
            subtitle: "Highlighting the 12 best live events. Click any event to open its folder and explore the full collection of detail shots from the night."
        })
        .commit();

    // 4. Publications Page
    console.log("Patching Publications Page...");
    await client.patch('publicationsPage')
        .set({ title: "Publications" })
        .setIfMissing({
            eyebrow: "Collection / 02",
            subtitle: "A curated archive of printed features, magazine covers, and digital editorials. This section is currently in production."
        })
        .commit();

    console.log("Done patching fallbacks!");
}

run().catch(console.error);
