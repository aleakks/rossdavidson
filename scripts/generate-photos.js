const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'content/photos');
const UPLOAD_DIR = path.join(process.cwd(), 'public/images/uploads');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const CATEGORIES = ['Music', 'Lifestyle', 'Events', 'Portrait', 'Studio'];

const generateFiles = () => {
    // 1. CLEAR EXISTING FILES
    const existingFiles = fs.readdirSync(OUTPUT_DIR).filter(file => file.endsWith('.md'));
    existingFiles.forEach(file => fs.unlinkSync(path.join(OUTPUT_DIR, file)));
    console.log('Cleared existing photos.');

    for (let i = 1; i <= 24; i++) {
        // Pad with leading zero for correct sorting (01, 02, etc.)
        const num = String(i).padStart(2, '0');
        const id = `image-${num}`;

        // Point to the standard filename that the user will upload to Media Library
        const imagePath = `/images/uploads/image-${num}.jpg`;
        const category = CATEGORIES[(i - 1) % CATEGORIES.length];

        // Date logic: Newest first (Image 01)
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString();

        const content = `---
title: "Gallery Image ${num}"
date: "${dateStr}"
category: "${category}"
image: "${imagePath}"
featured: false
---
`;

        fs.writeFileSync(path.join(OUTPUT_DIR, `${id}.md`), content);
        console.log(`Created ${id}.md`);
    }
};

generateFiles();
