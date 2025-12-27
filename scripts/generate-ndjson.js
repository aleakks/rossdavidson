const fs = require('fs');
const path = require('path');

// Helper to parse frontmatter simple style
function parseFrontmatter(content) {
    const titleMatch = content.match(/title: "(.*)"/);
    const dateMatch = content.match(/date: "(.*)"/);
    const categoryMatch = content.match(/category: "(.*)"/);

    let category = categoryMatch ? categoryMatch[1].toLowerCase() : 'personal';
    if (!['editorial', 'music', 'commercial', 'personal'].includes(category)) {
        category = 'personal';
    }

    return {
        title: titleMatch ? titleMatch[1] : 'Untitled',
        date: dateMatch ? dateMatch[1] : new Date().toISOString(),
        category,
    };
}

async function main() {
    const docs = [];

    // 1. Singletons
    docs.push({
        _id: "about",
        _type: "about",
        headline: "Capturing the Electricity of the Moment.",
        bio: "London-based Photographer specializing in Music, Nightlife, and Editorial Fashion. Creating iconic imagery that defines brands and captures the energy of the moment.",
        philosophy: "A multidisciplinary approach to visual storytelling, blending technical precision with raw emotion.",
        signature: "Ross Davidson"
    });

    docs.push({
        _id: "hero",
        _type: "hero",
        title: "ROSS\\nDAVIDSON",
        subtitle: "Music & Nightlife Photography"
    });

    docs.push({
        _id: "socialProof",
        _type: "socialProof",
        clients: ["Annie Mac", "skrillex", "blondish", "realblackcoffee", "followthefishtv", "adriatique"]
    });

    docs.push({
        _id: "contact",
        _type: "contact",
        status: "Accepting New Projects",
        email: "studio@rossdavidson.com",
        capabilities: ["Editorial", "Commercial", "Music/Touring", "Creative Direction"]
    });

    docs.push({
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
    });

    // 2. Services
    const services = [
        "Creative Direction",
        "Art Direction",
        "Photography",
        "Videography",
        "Post-Production",
        "Brand Consultancy"
    ];
    services.forEach((title, index) => {
        docs.push({
            _id: `service-${index}`,
            _type: "service",
            title: title,
            order: index + 1
        });
    });

    // 3. Gallery (Read local files)
    const photosDir = path.join(process.cwd(), 'content', 'photos');
    if (fs.existsSync(photosDir)) {
        const files = fs.readdirSync(photosDir).filter(f => f.endsWith('.md'));

        for (const file of files) {
            const content = fs.readFileSync(path.join(photosDir, file), 'utf-8');
            const meta = parseFrontmatter(content);
            const id = `gallery-${file.replace('.md', '')}`;

            docs.push({
                _id: id,
                _type: "galleryProject",
                title: meta.title,
                date: meta.date,
                category: meta.category
            });
        }
    }

    // Output NDJSON
    const ndjson = docs.map(doc => JSON.stringify(doc)).join('\n');
    fs.writeFileSync('full_content.ndjson', ndjson);
    console.log(`Generated full_content.ndjson with ${docs.length} documents.`);
}

main();
