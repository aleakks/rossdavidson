"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { galleryQuery } from "@/sanity/lib/queries";
import { useState, useEffect } from "react";

import { GalleryPhoto } from "@/types";

interface GalleryClientProps {
    photos: GalleryPhoto[];
    categories?: any[];
}

function getImageOrientation(photo: GalleryPhoto, index: number): 'landscape' | 'portrait' {
    try {
        const ref = photo.image?.asset?._ref;
        if (ref) {
            const match = ref.match(/-(\d+)x(\d+)-/);
            if (match) {
                const width = parseInt(match[1], 10);
                const height = parseInt(match[2], 10);
                if (width && height) {
                    return width >= height ? 'landscape' : 'portrait';
                }
            }
        }
    } catch (e) {
        console.error("Error parsing image dimensions:", e);
    }
    // Fallback: alternate between landscape and portrait for a dynamic look in development
    return index % 2 === 0 ? 'landscape' : 'portrait';
}

export default function GalleryClient({ photos }: GalleryClientProps) {
    const [livePhotos, setLivePhotos] = useState<GalleryPhoto[] | null>(null);

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch<GalleryPhoto[]>(
                    galleryQuery,
                    { _t: Date.now() },
                    { filterResponse: false, cache: 'no-store' }
                );

                // Using a type guard or direct check if needed, but client.fetch generic helps
                if (Array.isArray(fresh)) {
                    setLivePhotos(fresh);
                } else if (fresh && typeof fresh === 'object' && 'result' in fresh && Array.isArray((fresh as any).result)) {
                    // Fallback for some Sanity client versions wrapping result
                    setLivePhotos((fresh as any).result);
                }
            } catch (e) { console.error("Gallery fetch failed", e); }
        };
        fetchFresh();
    }, []);

    const allPhotos = livePhotos || photos;

    // Strict Array Check
    if (!allPhotos || !Array.isArray(allPhotos) || allPhotos.length === 0) return null;

    return (
        <section id="work" className="bg-black min-h-screen p-4 md:p-8">

            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 max-w-[1800px] mx-auto w-full">
                {allPhotos.slice(0, 20).map((photo, index) => {
                    const isLandscape = getImageOrientation(photo, index) === 'landscape';
                    
                    return (
                        <div
                            key={photo._id || index}
                            className="break-inside-avoid mb-4 relative group overflow-hidden bg-neutral-900 border border-white/5 hover:z-10 hover:border-white/20 transition-all duration-500 ease-out w-full"
                            tabIndex={0}
                        >
                            <div className={clsx(
                                "relative w-full overflow-hidden",
                                isLandscape ? "aspect-[3/2]" : "aspect-[2/3]"
                            )}>
                                {/* Image */}
                                {photo.image ? (
                                    <Image
                                        src={urlFor(photo.image).width(1200).quality(100).url()}
                                        alt={photo.altText || photo.title || "Music and Nightlife Photography by Ross Davidson"}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                                        <span className="font-mono text-[10px] md:text-xs uppercase text-white/20 tracking-widest px-2 text-center">
                                            No Image
                                        </span>
                                    </div>
                                )}

                                {/* Grain Overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                                />

                                {/* Hover/Tap Info Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none md:pointer-events-auto">
                                    <div className="text-center p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white font-display text-sm md:text-xl uppercase tracking-tighter mb-1 truncate px-2">
                                            {photo.client || photo.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Fallback for excess images or pagination/load more button could go here */}
        </section>
    );
}
