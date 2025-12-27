"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { galleryQuery } from "@/sanity/lib/queries";
import { useState, useEffect } from "react";

interface GalleryClientProps {
    photos: any[];
}

// Deterministic pattern for mixed grid:
// Mobile: 2-column | Desktop: 6-column
// Verified to align perfectly in both (summing to 2 and 6 respectively)
const getSize = (index: number) => {
    const pattern = [
        // 1. Small -> Mobile: 1 (half) | Desktop: 1
        "col-span-1 md:col-span-1 md:row-span-1",
        // 2. Small -> Mobile: 1 (half) | Desktop: 1
        "col-span-1 md:col-span-1 md:row-span-1",
        // Row 1 (Mobile): Full (1+1=2) | Row 1 (Desktop): Partial (2/6)

        // 3. Big Square -> Mobile: 2 (Full) | Desktop: 2x2
        "col-span-2 md:col-span-2 md:row-span-2",
        // Row 2 (Mobile): Full (2) | Row 1 (Desktop): Partial (4/6)

        // 4. Small -> Mobile: 1 | Desktop: 1
        "col-span-1 md:col-span-1 md:row-span-1",
        // 5. Small -> Mobile: 1 | Desktop: 1
        "col-span-1 md:col-span-1 md:row-span-1",
        // Row 3 (Mobile): Full (1+1=2) | Row 1 (Desktop): Full (6/6)

        // 6. Small -> Mobile: 1 | Desktop: 1
        "col-span-1 md:col-span-1 md:row-span-1",
        // 7. Small -> Mobile: 1 | Desktop: 1
        "col-span-1 md:col-span-1 md:row-span-1",
        // Row 4 (Mobile): Full (1+1=2) | Row 2 (Desktop): ... and so on.

        // 8. Wide -> Mobile: 2 (Full) | Desktop: 2x1
        "col-span-2 md:col-span-2 md:row-span-1",
    ];

    return pattern[index % pattern.length];
};

export default function GalleryClient({ photos }: GalleryClientProps) {
    const [livePhotos, setLivePhotos] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch(galleryQuery, { _t: Date.now() }, { filterResponse: false, cache: 'no-store' });
                // @ts-ignore
                if (fresh?.result && Array.isArray(fresh.result)) setLivePhotos(fresh.result);
            } catch (e) { console.error("Gallery fetch failed", e); }
        };
        fetchFresh();
    }, []);

    const displayPhotos = livePhotos || photos;

    // Strict Array Check
    if (!displayPhotos || !Array.isArray(displayPhotos) || displayPhotos.length === 0) return null;

    return (
        <section id="work" className="bg-black min-h-screen p-4 md:p-8">
            {/* 
         Mobile: 2 Columns | Desktop: 6 Columns
      */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[300px] max-w-[1800px] mx-auto">
                {displayPhotos.map((photo, index) => (
                    <div
                        key={photo._id || index}
                        className={clsx(
                            "relative group overflow-hidden bg-neutral-900 border border-white/5",
                            getSize(index), // Assigns the random size
                            "hover:z-10 hover:border-white/20 transition-all duration-500 ease-out"
                        )}
                    >
                        {/* Image */}
                        {photo.image ? (
                            <Image
                                src={urlFor(photo.image).width(1200).quality(100).url()}
                                alt={photo.altText || photo.title || "Music and Nightlife Photography by Ross Davidson"}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={90}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                                <span className="font-mono text-xs uppercase text-white/20 tracking-widest">
                                    No Image
                                </span>
                            </div>
                        )}

                        {/* Grain Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                        />

                        {/* Hover/Tap Info Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none md:pointer-events-auto">
                            <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-display text-2xl uppercase tracking-tighter mb-2">
                                    {photo.client || photo.title || "Client Name"}
                                </h3>
                                <div className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                                    <span>{photo.location || "London"}</span>
                                    <span className="w-4 h-[1px] bg-white/30 mx-auto my-1"></span>
                                    <span>{photo.category || "Editorial"}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
