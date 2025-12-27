import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import AboutClient from "./AboutClient";

async function getAboutData() {
    return await client.fetch(aboutQuery, {}, { next: { revalidate: 60 } });
}

export default async function About() {
    const data = await getAboutData();
    const artistImage = data?.artistImage ? urlFor(data.artistImage).width(1200).quality(100).url() : "/images/uploads/artist-image.jpg";

    return <AboutClient data={data} artistImage={artistImage} />;
}
