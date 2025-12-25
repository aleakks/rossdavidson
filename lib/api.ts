import fs from "fs";
import path from "path";
import matter from "gray-matter";

const photosDirectory = path.join(process.cwd(), "content/photos");

export interface Photo {
    id: string;
    title: string;
    date: string;
    category: string;
    image: string;
    featured?: boolean;
}

export function getPhotos(): Photo[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(photosDirectory)) {
        fs.mkdirSync(photosDirectory, { recursive: true });
        return [];
    }

    const fileNames = fs.readdirSync(photosDirectory);
    const allPhotos = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(photosDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            id,
            title: data.title,
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            category: data.category,
            image: data.image,
            featured: data.featured || false,
        };
    });

    return allPhotos.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export interface HeroSettings {
    title: string;
    subtitle: string;
    images: string[];
}

export function getHeroSettings(): HeroSettings {
    const settingsPath = path.join(process.cwd(), "content/settings/hero.json");

    if (!fs.existsSync(settingsPath)) {
        return {
            title: "ROSS\nDAVIDSON",
            subtitle: "Music & Nightlife Photography",
            images: []
        };
    }

    const fileContents = fs.readFileSync(settingsPath, "utf8");
    return JSON.parse(fileContents);
}
