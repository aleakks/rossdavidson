"use client";

import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/lib/api";
import { clsx } from "clsx";

interface GalleryProps {
    photos: Photo[];
}

// Deterministic pattern for 6-column grid (Gap-Free)
// 8 items = 2 rows exactly.
const getSize = (index: number) => {
    const pattern = [
        "md:col-span-1 md:row-span-1", // 1. Small (R1: 1)
        "md:col-span-1 md:row-span-1", // 2. Small (R1: 2)
        "md:col-span-2 md:row-span-2", // 3. Big Square (R1: 3-4, R2: 3-4)
        "md:col-span-1 md:row-span-1", // 4. Small (R1: 5)
        "md:col-span-1 md:row-span-1", // 5. Small (R1: 6)
        // Row 1 Full (1+1+2+1+1 = 6)

        "md:col-span-1 md:row-span-1", // 6. Small (R2: 1)
        "md:col-span-1 md:row-span-1", // 7. Small (R2: 2)
        // (R2: 3-4 Blocked by Item 3)
        "md:col-span-2 md:row-span-1", // 8. Wide (R2: 5-6)
        // Row 2 Full (1+1+2(blocked)+2 = 6)
    ];

    return pattern[index % pattern.length];
};

export default function Gallery({ photos }: GalleryProps) {
    if (!photos || photos.length === 0) return null;

    return (
        <section className="bg-black min-h-screen p-4 md:p-8">
            {/* 
         6-column grid for higher density (fitting 4-5+ items across)
      */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[300px] max-w-[1800px] mx-auto">
                {photos.map((photo, index) => (
                    <Link
                        href={`/photos/${photo.id}`}
                        key={photo.id}
                        className={clsx(
                            "relative group overflow-hidden bg-neutral-900 border border-white/5",
                            getSize(index), // Assigns the random size
                            "hover:z-10 hover:border-white/20 transition-all duration-500 ease-out"
                        )}
                    >
                        {/* Image */}
                        <Image
                            src={photo.image}
                            alt={photo.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        {/* Grain Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                        />

                        {/* Hover info */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center p-4">
                                <h3 className="text-white font-display text-2xl uppercase tracking-tighter">{photo.title}</h3>
                                <p className="text-white/60 font-mono text-xs uppercase tracking-widest mt-2">{photo.category}</p>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </section>
    );
}
