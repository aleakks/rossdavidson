import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
    console.log("Patching Contact...");
    await client.patch('contact')
        .setIfMissing({
            title: "Let's Work",
            description: "Seeking projects that challenge the norm. Fashion, Music, Art Direction.",
            disclaimer: "By submitting this form you acknowledge that great work takes time and energy.",
            status: "Accepting New Projects",
            email: "contact@rossdavidsonphoto.com",
            capabilities: ["Editorial Photography", "Commercial Campaign", "Creative Direction", "Moving Image"]
        })
        .commit();

    console.log("Patching Social Proof...");
    await client.patch('socialProof')
        .setIfMissing({
            primaryCallout: "Featured in & Trusted by",
            clients: ["Mixmag", "DJ Mag", "Insomniac", "Defected", "Cercle", "Afterlife"]
        })
        .commit();

    console.log("Patching Info Page...");
    await client.patch('infoPage')
        .setIfMissing({
            approachTitle: "Approach",
            approachDescription: "A bespoke approach to capturing nightlife, music, and editorial fashion. I don't just document events; I create iconic imagery that defines brands.",
            investmentTitle: "Investment",
            investmentDescription: "Because every project is unique, I provide bespoke quotes tailored to your specific requirements and usage rights.",
            investmentCta: "Request Rate Card"
        })
        .commit();

    console.log("Done patching all remainders!");
}

run().catch(console.error);
