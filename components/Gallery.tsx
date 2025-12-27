import { client } from "@/sanity/lib/client";
import { galleryQuery } from "@/sanity/lib/queries";
import GalleryClient from "./GalleryClient";

async function getGalleryData() {
    return await client.fetch(galleryQuery, {}, { next: { revalidate: 60 } });
}

export default async function Gallery() {
    const photos = await getGalleryData();
    return <GalleryClient photos={photos} />;
}
