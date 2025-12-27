import { client } from "@/sanity/lib/client";
import { photoStackQuery } from "@/sanity/lib/queries";
import PhotoStackClient from "./PhotoStackClient";

// Fetch data directly in the component (Server Component)
async function getData() {
    const data = await client.fetch(photoStackQuery, {}, { next: { revalidate: 60 } });
    return data?.cards || [];
}

export default async function PhotoStack() {
    const cards = await getData();
    return <PhotoStackClient cards={cards} />;
}
