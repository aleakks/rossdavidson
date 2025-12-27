import { client } from "@/sanity/lib/client";
import { heroQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import HeroClient from "./HeroClient";

async function getHeroData() {
    return await client.fetch(heroQuery, {}, { next: { revalidate: 60 } });
}

export default async function Hero() {
    const data = await getHeroData();
    const title = data?.title || "ROSS\nDAVIDSON";
    const subtitle = data?.subtitle || "Music & Nightlife Photography";
    // Map Sanity images to URLs
    const images = data?.images?.map((img: any) => urlFor(img).width(2560).height(1440).quality(100).url()) || [];

    return <HeroClient title={title} subtitle={subtitle} images={images} />;
}
