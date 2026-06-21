"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { photoStackQuery } from "@/sanity/lib/queries";

export default function PhotoStackClient({ cards }: { cards: any[] }) {
    const [liveCards, setLiveCards] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch(photoStackQuery, { _t: Date.now() }, { filterResponse: false, cache: 'no-store' });
                // @ts-ignore
                if (fresh?.result?.cards && Array.isArray(fresh.result.cards)) {
                    // @ts-ignore
                    setLiveCards(fresh.result.cards);
                }
            } catch (e) { console.error("Stack fetch failed", e); }
        };
        fetchFresh();
    }, []);

    const displayCards = liveCards || cards;

    if (!displayCards || !Array.isArray(displayCards) || displayCards.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-black overflow-hidden relative border-t border-white/10">
            <div className="container mx-auto px-6">

                <div className="flex items-center justify-between mb-16 md:mb-24 px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
                        Selected<br /><span className="text-white/40">Works</span>
                    </h2>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1400px] mx-auto w-full">
                    {displayCards.map((card: any, index: number) => (
                        <GridCard
                            key={index}
                            card={card}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function GridCard({ card, index }: { card: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
            className="bg-white p-3 pb-8 shadow-2xl cursor-default relative w-full aspect-[4/5] flex flex-col border border-white/5"
        >
            <div className="relative w-full flex-grow overflow-hidden bg-black">
                {card.image ? (
                    <Image
                        src={urlFor(card.image).width(1200).quality(95).url()}
                        alt={card.alt || "Portfolio Image"}
                        fill
                        className="object-cover pointer-events-none"
                        quality={95}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900 border border-white/10">
                        <span className="font-mono text-[10px] uppercase text-white/30 tracking-widest">
                            Upload Image
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>
            <div className="flex items-center justify-between px-1 font-mono text-black uppercase tracking-widest mt-3 mb-1">
                <div className="flex flex-col justify-center leading-none text-left">
                    <span className="text-xs font-bold">{card.client}</span>
                    <span className="text-[10px] text-black/60 mt-1">{card.location}</span>
                </div>
                <span className="text-xs opacity-40">Editorial</span>
            </div>
        </motion.div>
    );
}
