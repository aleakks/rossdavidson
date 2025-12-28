import { client } from "@/sanity/lib/client";
import { galleryQuery, categoriesQuery } from "@/sanity/lib/queries";
import GalleryClient from "./GalleryClient";

async function getGalleryData() {
    const [photos, categories] = await Promise.all([
        client.fetch(galleryQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(categoriesQuery, {}, { next: { revalidate: 60 } })
    ]);
    return { photos, categories };
}

export default async function Gallery() {
    const { photos, categories } = await getGalleryData();
    return <GalleryClient photos={photos} categories={categories} />;
}
