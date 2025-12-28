import { client } from "@/sanity/lib/client";
import { heroQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import HeroClient from "./HeroClient";

async function getHeroData() {
    return await client.fetch(heroQuery, {}, { next: { revalidate: 60 } });
}

export default async function Hero() {
    let data;
    let errorMsg = null;

    try {
        data = await getHeroData();
    } catch (error: any) {
        console.error("Hero Fetch Error:", error);
        errorMsg = error.message || "Unknown error";
        data = null;
    }

    if (errorMsg) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-red-950 text-white p-10 z-[50]">
                <div className="max-w-xl">
                    <h2 className="text-2xl font-bold mb-4">HERO COMPONENT ERROR</h2>
                    <p className="font-mono bg-black/50 p-4 rounded mb-4 overflow-auto">{errorMsg}</p>
                    <p>Check Cloudflare Environment Variables (NEXT_PUBLIC_SANITY_PROJECT_ID).</p>
                </div>
            </div>
        );
    }

    const title = data?.title || "Music & Nightlife\nPhotographer";
    const subtitle = data?.subtitle || "Touring, editorial and commercial photography for artists, labels and culture-led brands.";
    // Fallback for eyebrow not in initial data
    const eyebrow = data?.eyebrow || "ROSS DAVIDSON";
    // Map Sanity images to URLs
    const images = data?.images?.map((img: any) => urlFor(img).width(1920).quality(95).url()) || [];

    return <HeroClient title={title} subtitle={subtitle} images={images} eyebrow={eyebrow} />;
}
