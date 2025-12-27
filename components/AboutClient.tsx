"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import { useState, useEffect } from "react";

export default function AboutClient({ data, artistImage }: { data: any, artistImage: string }) {
    const [liveData, setLiveData] = useState<any>(null);

    // Live Content Refresh
    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch(aboutQuery, { _t: Date.now() }, { filterResponse: false, cache: 'no-store' });
                // @ts-ignore
                if (fresh?.result) setLiveData(fresh.result);
            } catch (e) { console.error("About fetch failed", e); }
        };
        fetchFresh();
    }, []);

    const displayData = liveData || data;

    if (!displayData) return null;

    return (
        <section id="about" className="bg-black py-24 md:py-32 relative z-10 border-t border-white/5">
            <div className="container mx-auto px-6">

                {/* Section Tag */}
                <div className="mb-16 md:mb-24">
                    <h2 className="text-xs font-mono tracking-[0.5em] text-white/60 uppercase border-b border-white/20 pb-4 inline-block">
                        The Artist
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                    {/* Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative aspect-[3/4] w-full max-w-md mx-auto md:mx-0 overflow-hidden grayscale contrast-125"
                    >
                        <Image
                            src={artistImage}
                            alt="Ross Davidson"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Static Noise Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                        />
                    </motion.div>

                    {/* Bio & Philosophy */}
                    <div className="space-y-12">

                        <div className="space-y-6">
                            <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none whitespace-pre-line">
                                {displayData.headline || "Capturing the Electricity of the Moment."}
                            </h3>
                            <p className="font-sans text-white/70 text-lg leading-relaxed max-w-lg whitespace-pre-line">
                                {displayData.bio}
                            </p>
                        </div>

                        {displayData.philosophy && (
                            <div className="space-y-4">
                                <h4 className="text-sm font-mono tracking-[0.3em] text-white/50 uppercase">
                                    Philosophy
                                </h4>
                                <p className="font-sans text-white/70 text-base leading-relaxed max-w-lg border-l-2 border-white/20 pl-6 italic">
                                    "{displayData.philosophy}"
                                </p>
                            </div>
                        )}

                        {/* Signature / Name */}
                        <div className="pt-8">
                            <div className="text-2xl font-display uppercase tracking-widest text-white">
                                {data.signature || "Ross Davidson"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
