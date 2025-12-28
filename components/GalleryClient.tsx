"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { galleryQuery } from "@/sanity/lib/queries";
import { useState, useEffect } from "react";

interface GalleryClientProps {
    photos: any[];
    categories: { title: string; slug: string }[];
}

// Deterministic pattern for mixed grid:
// Mobile: 2-column | Desktop: 6-column
const getSize = (index: number) => {
    const pattern = [
        "col-span-1 md:col-span-1 md:row-span-1",
        "col-span-1 md:col-span-1 md:row-span-1",
        "col-span-2 md:col-span-2 md:row-span-2",
        "col-span-1 md:col-span-1 md:row-span-1",
        "col-span-1 md:col-span-1 md:row-span-1",
        "col-span-1 md:col-span-1 md:row-span-1",
        "col-span-1 md:col-span-1 md:row-span-1",
        "col-span-2 md:col-span-2 md:row-span-1",
    ];
    return pattern[index % pattern.length];
};

export default function GalleryClient({ photos, categories }: GalleryClientProps) {
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

    const allPhotos = livePhotos || photos;
    const [filter, setFilter] = useState("all");

    // Strict Array Check
    if (!allPhotos || !Array.isArray(allPhotos) || allPhotos.length === 0) return null;

    // Filter Logic
    const filteredPhotos = filter === "all"
        ? allPhotos
        : allPhotos.filter(p => p.category === filter); // Now comparing slug to slug

    // Dynamic Filters: "All Work" + Sanity Categories
    const filters = [
        { id: 'all', label: 'All Work' },
        ...(categories?.map(c => ({ id: c.slug, label: c.title })) || [])
    ];

    return (
        <section id="work" className="bg-black min-h-screen p-4 md:p-8">

            {/* Filter Bar (Static - Item 4 requested fix) */}
            <div className="z-50 mb-8 flex justify-center">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex gap-6 md:gap-8 overflow-x-auto max-w-full no-scrollbar">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={clsx(
                                "font-mono text-xs uppercase tracking-widest transition-colors whitespace-nowrap",
                                filter === f.id ? "text-white" : "text-white/40 hover:text-white/70"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 
         Mobile: 2 Columns | Desktop: 6 Columns
      */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[300px] max-w-[1800px] mx-auto">
                {filteredPhotos.map((photo, index) => (
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
