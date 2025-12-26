"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

// Placeholder high-fashion/editorial images
// Placeholder high-fashion/editorial images
const CARDS = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
        alt: "Editorial 1",
        client: "VOGUE",
        location: "Paris"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop",
        alt: "Editorial 2",
        client: "PRADA",
        location: "Milan"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
        alt: "Editorial 3",
        client: "OFF-WHITE",
        location: "London"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
        alt: "Editorial 4",
        client: "NIKE",
        location: "Tokyo"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        alt: "Editorial 5",
        client: "YSL",
        location: "NYC"
    }
];

// ... (SCATTER_POSITIONS remains unchanged)

// ... (PhotoStack component remains unchanged)



// Deterministic chaotic positions for the "Messy Desk" look (Desktop Only)
const SCATTER_POSITIONS = [
    { x: -650, y: -20, rotate: -6 },   // Far Left
    { x: -350, y: 40, rotate: -2 },    // Mid Left
    { x: 0, y: -30, rotate: 4 },       // Center
    { x: 350, y: 50, rotate: -3 },     // Mid Right
    { x: 650, y: -10, rotate: 6 },     // Far Right
];

export default function PhotoStack() {
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
                    {CARDS.map((card, index) => (
                        <ScatteredCard
                            key={card.id}
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

    // Animation Variants
    // Mobile: Simple fade up, no rotation, no X offset, default Y layout flow
    // Desktop: Complex scatter
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: isDesktop ? desktopPos.y : 0,
            x: isDesktop ? desktopPos.x : 0,
            rotate: isDesktop ? desktopPos.rotate : 0, // No rotation on mobile to keep it clean
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
            // Mobile: Relative positioning, proper width, aspect ratio, no absolute
            // Desktop: Absolute positioning, centered based
            className={`
                bg-white p-2 md:p-3 shadow-2xl cursor-default
                relative w-full max-w-[340px] aspect-[4/5]
                md:absolute md:w-[420px] md:max-w-none md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            `}
        >
            <div className="relative w-full h-full flex flex-col">
                <div className="relative flex-grow w-full overflow-hidden bg-black">
                    <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        className="object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </div>
                <div className="h-10 md:h-12 flex items-center justify-between px-1 font-mono text-black uppercase tracking-widest mt-1">
                    <div className="flex flex-col justify-center leading-none text-left">
                        <span className="text-[10px] md:text-sm font-bold">{card.client}</span>
                        <span className="text-[8px] md:text-[10px] text-black/60">{card.location}</span>
                    </div>
                    <span className="text-[10px] md:text-xs opacity-40">Editorial</span>
                </div>
            </div>
        </motion.div>
    );
}
