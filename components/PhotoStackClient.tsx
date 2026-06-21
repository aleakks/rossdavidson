"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { photoStackQuery } from "@/sanity/lib/queries";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoStackClient({ cards }: { cards: any[] }) {
    const [liveCards, setLiveCards] = useState<any[] | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const handlePrevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (displayCards && lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === 0 ? displayCards.length - 1 : prev! - 1));
        }
    };

    const handleNextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (displayCards && lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === displayCards.length - 1 ? 0 : prev! + 1));
        }
    };

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "ArrowLeft") handlePrevImage();
            if (e.key === "ArrowRight") handleNextImage();
            if (e.key === "Escape") setLightboxIndex(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, liveCards, cards]);

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
                            onClick={() => setLightboxIndex(index)}
                        />
                    ))}
                </div>

                {/* Lightbox / Fullscreen Carousel Overlay */}
                <AnimatePresence>
                    {lightboxIndex !== null && displayCards[lightboxIndex] && (() => {
                        const activeCard = displayCards[lightboxIndex];
                        const activeImgUrl = activeCard.image ? urlFor(activeCard.image).width(1600).quality(95).url() : "";
                        return (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setLightboxIndex(null)}
                                className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setLightboxIndex(null)}
                                    className="absolute top-8 right-6 z-[210] bg-white text-black p-3 hover:bg-neutral-200 transition-colors flex items-center justify-center rounded-full"
                                    aria-label="Close Lightbox"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Left Arrow */}
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                                    aria-label="Previous Image"
                                >
                                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                                </button>

                                {/* Image container */}
                                <div 
                                    className="relative max-w-[90vw] max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="relative w-full h-full flex-grow flex items-center justify-center">
                                        {activeImgUrl && (
                                            <Image
                                                src={activeImgUrl}
                                                alt={`${activeCard.client} Fullscreen ${lightboxIndex + 1}`}
                                                fill
                                                className="object-contain pointer-events-none select-none"
                                                sizes="90vw"
                                                priority
                                            />
                                        )}
                                    </div>
                                    {/* Subtitle Caption */}
                                    <div className="text-center font-mono uppercase mt-6 select-none pointer-events-none">
                                        <div className="text-white text-sm font-bold tracking-widest">{activeCard.client}</div>
                                        <div className="text-white/40 text-[10px] tracking-wider mt-1">{activeCard.location}</div>
                                    </div>
                                </div>

                                {/* Right Arrow */}
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                                    aria-label="Next Image"
                                >
                                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                                </button>

                                {/* Indicator Counter */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.2em] text-white/50 bg-black/60 px-4 py-2 border border-white/10 rounded-full">
                                    {lightboxIndex + 1} / {displayCards.length}
                                </div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>
        </section>
    );
}

function GridCard({ card, index, onClick }: { card: any, index: number, onClick: () => void }) {
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
            onClick={onClick}
            className="bg-white p-3 pb-8 shadow-2xl cursor-zoom-in relative w-full aspect-[4/5] flex flex-col border border-white/5"
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
