const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'content/photos');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const CATEGORIES = ['Music', 'Nightlife', 'Festival', 'Portrait', 'Lifestyle'];

const IMAGES = [
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f436?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514525253440-b393452e2729?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1459749411177-0473ef716089?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519751138087-5bf797b13d1a?auto=format&fit=crop&q=80", // Portrait
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80", // Event
    "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504194921103-f8b800e69786?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520182181757-074094a97395?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485081691361-cc72e737c0df?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516975574044-ed34c82c3c6f?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529124237119-03a11fc7b14d?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80"
];

const generateFiles = () => {
    for (let i = 0; i < 20; i++) {
        const id = `mock-photo-${i + 1}`;
        const image = IMAGES[i % IMAGES.length];
        const category = CATEGORIES[i % CATEGORIES.length];

        // Add varied dimensions to the title to help us confirm layout visually if needed, 
        // though the component handles sizing dynamically.
        const content = `---
title: "Gallery Item ${i + 1}"
date: "2024-0${(i % 9) + 1}-15T20:00:00Z"
category: "${category}"
image: "${image}"
featured: false
---
`;

        fs.writeFileSync(path.join(OUTPUT_DIR, `${id}.md`), content);
        console.log(`Created ${id}.md`);
    }
};

generateFiles();
console.log('Done generating 20 mock photos.');
