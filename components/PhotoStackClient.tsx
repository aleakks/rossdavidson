"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { photoStackQuery } from "@/sanity/lib/queries";

// Dynamic positioning factors for the "Messy Desk" look (scaled based on viewport width)
const SCATTER_POSITIONS = [
    { xFactor: -0.38, y: -20, rotate: -6 },   // Far Left
    { xFactor: -0.19, y: 40, rotate: -2 },    // Mid Left
    { xFactor: 0, y: -30, rotate: 4 },       // Center
    { xFactor: 0.19, y: 50, rotate: -3 },     // Mid Right
    { xFactor: 0.38, y: -10, rotate: 6 },     // Far Right
];

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

    // Strict Array Check
    if (!displayCards || !Array.isArray(displayCards) || displayCards.length === 0) return null;

    return (
        <section className="py-12 md:py-24 bg-black overflow-hidden relative border-t border-white/10">
            <div className="container mx-auto px-6">

                <div className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">
                        Selected<br /><span className="text-white/40">Works</span>
                    </h2>
                </div>

                {/* Mobile/Tablet: Vertical List | Desktop/Large Laptops: Messy Desk Area */}
                <div className="relative w-full flex flex-col items-center gap-12 xl:gap-0 xl:block xl:h-[600px] xl:flex-none">
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
    const [windowWidth, setWindowWidth] = useState(1200);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsDesktop(window.innerWidth >= 1280);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const desktopPos = SCATTER_POSITIONS[index % SCATTER_POSITIONS.length];
    
    // Scale horizontal distance dynamically based on screen width
    const xOffset = isDesktop ? (desktopPos.xFactor * Math.min(windowWidth, 1800)) : 0;

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: isDesktop ? desktopPos.y : 0,
            x: xOffset,
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
                bg-white p-3 pb-8 xl:p-3 shadow-2xl cursor-default
                relative w-full max-w-[340px] h-auto xl:h-auto xl:aspect-[4/5]
                xl:absolute xl:w-[24vw] xl:max-w-[420px] xl:min-w-[260px] xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2
            `}
        >
            <div className="relative w-full h-full flex flex-col">
                <div className="relative w-full aspect-[4/5] xl:aspect-auto xl:flex-grow overflow-hidden bg-black">
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
                        <span className="text-[10px] xl:text-sm font-bold">{card.client}</span>
                        <span className="text-[8px] xl:text-[10px] text-black/60 mt-1">{card.location}</span>
                    </div>
                    <span className="text-[10px] xl:text-xs opacity-40">Editorial</span>
                </div>
            </div>
        </motion.div>
    );
}
