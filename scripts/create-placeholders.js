const fs = require('fs');
const path = require('path');
const https = require('https');

const UPLOAD_DIR = path.join(process.cwd(), 'public/images/uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// A simple placeholder image URL (using a slightly generic one)
const PLACEHOLDER_URL = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800";

const downloadImage = (filename) => {
    const dest = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(dest)) return; // Don't overwrite if exists (user might have uploaded)

    const file = fs.createWriteStream(dest);
    https.get(PLACEHOLDER_URL, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    });
};

for (let i = 1; i <= 24; i++) {
    downloadImage(`image-${String(i).padStart(2, '0')}.jpg`);
}
