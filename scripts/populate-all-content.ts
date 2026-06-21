import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 's7aj2kcx',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_TOKEN
})

async function run() {
    // 1. Update socialProof Callout Text
    console.log("Updating Social Proof Callout Text...");
    const socialProofExists = await client.getDocument('socialProof');
    if (!socialProofExists) {
        await client.create({
            _type: 'socialProof',
            _id: 'socialProof',
            primaryCallout: "Featured in & Trusted by",
            clients: ["Mixmag", "DJ Mag", "Insomniac", "Defected", "Cercle", "Afterlife"]
        });
    } else {
        await client.patch('socialProof')
            .set({ primaryCallout: "Featured in & Trusted by" })
            .commit();
    }

    // 2. Info Page Settings
    console.log("Updating Info Page Settings...");
    await client.createIfNotExists({
        _type: 'infoPage',
        _id: 'infoPage',
        approachTitle: "Approach",
        approachDescription: "A bespoke approach to capturing nightlife, music, and editorial fashion. I don't just document events; I create iconic imagery that defines brands.",
        investmentTitle: "Investment",
        investmentDescription: "Because every project is unique, I provide bespoke quotes tailored to your specific requirements and usage rights.",
        investmentCta: "Request Rate Card",
        faqs: [
            {
                _key: "faq-1",
                question: "Do you travel?",
                answer: "Yes. Based in London but available worldwide. Travel expenses are calculated per project."
            },
            {
                _key: "faq-2",
                question: "What is your turnaround time?",
                answer: "For events, a 'highlights' gallery is delivered within 24 hours. Full delivery typically takes 5-7 business days."
            }
        ]
    });

    // 3. Live Page Settings
    console.log("Updating Live Page Settings...");
    await client.createIfNotExists({
        _type: 'livePage',
        _id: 'livePage',
        eyebrow: "Collection / 01",
        title: "Live & Touring",
        subtitle: "Highlighting the 12 best live events. Click any event to open its folder and explore the full collection of detail shots from the night."
    });

    // 4. Publications Page Settings
    console.log("Updating Publications Page Settings...");
    await client.createIfNotExists({
        _type: 'publicationsPage',
        _id: 'publicationsPage',
        eyebrow: "Collection / 02",
        title: "Publications",
        subtitle: "A curated archive of printed features, magazine covers, and digital editorials. This section is currently in production."
    });

    // 5. Contact Settings
    console.log("Updating Contact Settings...");
    const contactExists = await client.getDocument('contact');
    if (!contactExists) {
        await client.create({
            _type: 'contact',
            _id: 'contact',
            title: "Let's Work",
            description: "Seeking projects that challenge the norm. Fashion, Music, Art Direction.",
            disclaimer: "By submitting this form you acknowledge that great work takes time and energy.",
            status: "Accepting New Projects",
            email: "contact@rossdavidsonphoto.com",
            capabilities: ["Editorial Photography", "Commercial Campaign", "Creative Direction", "Moving Image"],
            licensingText: "All commercial work includes tailored licensing usage rights. Full buyouts available upon request."
        });
    } else {
        await client.patch('contact')
            .set({
                title: "Let's Work",
                description: "Seeking projects that challenge the norm. Fashion, Music, Art Direction.",
                disclaimer: "By submitting this form you acknowledge that great work takes time and energy."
            })
            .commit();
    }

    // 6. Create 12 Live Event folders if they do not exist
    console.log("Creating 12 Live Event placeholders...");
    const titles = [
        "Mixmag Live",
        "Defected Croatia",
        "Afterlife Ibiza",
        "DJ Mag Showcase",
        "Cercle at Colosseum",
        "Coachella Sahara Stage",
        "Fabric London",
        "Printworks Closing",
        "Tomorrowland Mainstage",
        "Glastonbury Arcadia",
        "Creamfields Steel Yard",
        "Sonar Barcelona"
    ];
    const locations = [
        "London, UK",
        "Tisno, Croatia",
        "Ibiza, Spain",
        "Paris, France",
        "Rome, Italy",
        "California, USA",
        "London, UK",
        "London, UK",
        "Boom, Belgium",
        "Pilton, UK",
        "Daresbury, UK",
        "Barcelona, Spain"
    ];

    for (let i = 0; i < 12; i++) {
        const docId = `liveEvent-${i + 1}`;
        await client.createIfNotExists({
            _type: 'liveEvent',
            _id: docId,
            title: titles[i],
            location: locations[i],
            date: `2026-0${(i % 9) + 1}-15`,
            order: i + 1,
            images: []
        });
        console.log(`Live event placeholder ${i + 1} created/verified.`);
    }

    // 7. Create 8 Publications placeholders
    console.log("Creating 8 Publications placeholders...");
    const pubTitles = [
        "Ross Davidson: Capturing Nightlife's Raw Energy",
        "Behind the Lens: The Art of Live Music Photography",
        "Defected Croatia 2025: The Official Photo Gallery",
        "Visual Identity in Modern Dance Music",
        "How Ross Davidson Captures Ibiza's Darkest Raves",
        "Touring with the World's Biggest DJs",
        "Nightlife Aesthetics: Editorial Meets Rave",
        "Behind the Stage: Printworks Closing Gallery"
    ];
    const pubPublishers = [
        "DJ Mag",
        "Mixmag",
        "Defected Records",
        "Beatportal",
        "Resident Advisor",
        "Music Radar",
        "Vogue Music",
        "Dazed & Confused"
    ];
    const pubUrls = [
        "https://djmag.com",
        "https://mixmag.net",
        "https://defected.com",
        "https://www.beatport.com",
        "https://ra.co",
        "https://www.musicradar.com",
        "https://vogue.com",
        "https://dazeddigital.com"
    ];

    for (let i = 0; i < 8; i++) {
        const docId = `publication-${i + 1}`;
        await client.createIfNotExists({
            _type: 'publication',
            _id: docId,
            title: pubTitles[i],
            publisher: pubPublishers[i],
            url: pubUrls[i],
            ctaLabel: "Read Article",
            order: i + 1
        });
        console.log(`Publication placeholder ${i + 1} created/verified.`);
    }

    console.log("Database update completed successfully!");
}

run().catch(console.error);
