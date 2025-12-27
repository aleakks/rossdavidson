"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { photoStackQuery } from "@/sanity/lib/queries";

// Deterministic chaotic positions for the "Messy Desk" look (Desktop Only)
const SCATTER_POSITIONS = [
    { x: -650, y: -20, rotate: -6 },   // Far Left
    { x: -350, y: 40, rotate: -2 },    // Mid Left
    { x: 0, y: -30, rotate: 4 },       // Center
    { x: 350, y: 50, rotate: -3 },     // Mid Right
    { x: 650, y: -10, rotate: 6 },     // Far Right
];

export default function PhotoStackClient({ cards }: { cards: any[] }) {
    const [liveCards, setLiveCards] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                // Ensure we select the 'cards' array from the result object if query returns object
                // The query is defined as: *[_type == "photoStack"][0] { cards[] { ... } }
                // So result is { cards: [...] }
                const fresh = await client.fetch(photoStackQuery, { _t: Date.now() }, { filterResponse: false, cache: 'no-store' });
                if ((fresh as any)?.cards) setLiveCards((fresh as any).cards);
            } catch (e) { console.error("Stack fetch failed", e); }
        };
        fetchFresh();
    }, []);

    const displayCards = liveCards || cards;

    if (!displayCards || displayCards.length === 0) return null;

    return (
        <section className="py-24 bg-black overflow-hidden relative border-t border-white/10">
            <div className="container mx-auto px-6">

                <div className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
                        Selected<br /><span className="text-white/40">Works</span>
                    </h2>
                    <div className="text-right hidden md:block">
                        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                            Archive
                        </p>
                        <p className="font-sans text-white/60 text-sm">
                            Selected Works 2024
                        </p>
                    </div>
                </div>

                {/* Mobile: Vertical List | Desktop: Messy Desk Area */}
                <div className="relative w-full flex flex-col items-center gap-12 md:gap-0 md:block md:h-[600px] md:flex-none">
                    {displayCards.map((card: any, index: number) => (
                        <ScatteredCard
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

function ScatteredCard({ card, index }: { card: any, index: number }) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const desktopPos = SCATTER_POSITIONS[index % SCATTER_POSITIONS.length];

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: isDesktop ? desktopPos.y : 0,
            x: isDesktop ? desktopPos.x : 0,
            rotate: isDesktop ? desktopPos.rotate : 0,
            transition: {
                type: "spring" as const,
                damping: 40,
                stiffness: 90,
                delay: index * 0.1
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants}
            whileHover={isDesktop ? {
                scale: 1.05,
                zIndex: 50,
                transition: { duration: 0.3 }
            } : {}}
            className={`
                bg-white p-3 pb-8 md:p-3 shadow-2xl cursor-default
                relative w-full max-w-[340px] h-auto md:h-auto md:aspect-[4/5]
                md:absolute md:w-[420px] md:max-w-none md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            `}
        >
            <div className="relative w-full h-full flex flex-col">
                <div className="relative w-full aspect-[4/5] md:aspect-auto md:flex-grow overflow-hidden bg-black">
                    {/* Sanity Image URL - Safe Check */}
                    {card.image ? (
                        <Image
                            src={urlFor(card.image).width(1200).quality(100).url()}
                            alt={card.alt || "Portfolio Image"}
                            fill
                            className="object-cover pointer-events-none"
                            quality={100}
                            sizes="(max-width: 768px) 100vw, 50vw"
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
                        <span className="text-[10px] md:text-sm font-bold">{card.client}</span>
                        <span className="text-[8px] md:text-[10px] text-black/60 mt-1">{card.location}</span>
                    </div>
                    <span className="text-[10px] md:text-xs opacity-40">Editorial</span>
                </div>
            </div>
        </motion.div>
    );
}
