"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import type { Photo } from "@/lib/api";

interface GalleryProps {
    photos?: Photo[];
}

// Fallback data if no photos are passed or CMS fails
const defaultPhotos: Photo[] = [
    { id: "1", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80", title: "Club Haze", category: "Nightlife", date: "2024-01-01" },
    { id: "2", image: "https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80", title: "Midnight Bass", category: "Music", date: "2024-02-01" },
    { id: "3", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80", title: "Crowd Control", category: "Events", date: "2024-03-01" },
    { id: "4", image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80", title: "Neon Dreams", category: "Creative", date: "2024-04-01" },
    { id: "5", image: "https://images.unsplash.com/photo-1514525253440-b393452e2729?auto=format&fit=crop&q=80", title: "Main Stage", category: "Music", date: "2024-05-01" },
    { id: "6", image: "https://images.unsplash.com/photo-1459749411177-0473ef716089?auto=format&fit=crop&q=80", title: "Backstage", category: "Lifestyle", date: "2024-06-01" },
];

export default function Gallery({ photos = [] }: GalleryProps) {
    const displayPhotos = photos.length > 0 ? photos : defaultPhotos;
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Helper to determine span based on index/pattern for masonry look
    const getGridClass = (index: number) => {
        const pattern = index % 6;
        if (pattern === 1) return "col-span-1 md:col-span-2 row-span-2";
        if (pattern === 4) return "col-span-1 md:col-span-1 row-span-2";
        return "col-span-1 row-span-1";
    };

    return (
        <section className="bg-background min-h-screen px-4 pb-24 pt-10">
            <div className="max-w-[1920px] mx-auto">
                <h2 className="text-sm font-mono mb-12 text-accent-dim uppercase tracking-widest pl-2 border-l border-accent-dim h-4 flex items-center">
                    Visual Archive
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 auto-rows-[400px]">
                    {displayPhotos.map((photo, index) => (
                        <div
                            key={photo.id}
                            className={clsx(
                                "relative group overflow-hidden bg-[#111]",
                                getGridClass(index),
                                hoveredId && hoveredId !== photo.id && "opacity-30 blur-[2px] scale-95 transition-all duration-500",
                                "transition-all duration-500 ease-out"
                            )}
                            onMouseEnter={() => setHoveredId(photo.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Grain Overlay */}
                            <div className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-overlay"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                            />

                            <Image
                                src={photo.image}
                                alt={photo.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Hover Info */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-8">
                                <span className="text-accent text-xs font-mono tracking-widest uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{photo.category}</span>
                                <h3 className="text-white text-4xl font-display uppercase tracking-tighter translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{photo.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
