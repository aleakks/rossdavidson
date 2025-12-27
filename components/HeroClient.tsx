"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { heroQuery } from "@/sanity/lib/queries";

interface HeroClientProps {
    title: string;
    subtitle: string;
    images: string[];
}

export default function HeroClient({ title, subtitle, images }: HeroClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [liveData, setLiveData] = useState<any>(null);

    // Rapid Fire Montage Logic
    useEffect(() => {
        if (images && images.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 600);
            return () => clearInterval(interval);
        }
    }, [images]);

    // Live Content Refresh (Bypass Cache)
    useEffect(() => {
        const fetchFreshData = async () => {
            try {
                // Add timestamp to params to force instant cache invalidation
                const fresh = await client.fetch(heroQuery, { _t: Date.now() }, {
                    filterResponse: false,
                    // @ts-ignore
                    cache: 'no-store',
                    next: { revalidate: 0 }
                });

                // @ts-ignore
                if (fresh?.result) setLiveData(fresh.result);
            } catch (e) {
                console.error("HeroClient: Live fetch failed", e);
            }
        };
        fetchFreshData();
    }, []);

    // Use live data if available, otherwise static props
    const displayTitle = liveData?.title || title;
    const displaySubtitle = liveData?.subtitle || subtitle;
    // For images, we need to rebuild URLs if new data comes in, but for safety let's stick to static images for now 
    // or we'd need to import urlFor. Text is the main thing users notice updating.
    // To keep it simple and robust, let's update text first.


    const currentImage = images && images.length > 0 ? images[currentImageIndex] : null;

    return (
        <div className="h-screen relative bg-black w-full overflow-hidden flex items-center justify-center">

            {/* 1. Rapid Fire Background Montage */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    {currentImage && (
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={currentImage}
                                alt="Background Moment"
                                fill
                                className="object-cover opacity-60 grayscale-[0.3] contrast-125 saturate-110"
                                style={{ objectPosition: '50% 25%' }} // Focus on faces/top third
                                priority
                                quality={100}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Overlays for Vibe */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_90%)]" />
            </div>

            {/* 2. Strobe & Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* 3. Kinetic Text */}
            <div
                className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none p-4"
            >
                {/* Pre-Header Branding */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mb-6 flex items-center gap-4"
                >
                    <div className="h-[1px] w-12 bg-white/70" />
                    <span className="font-mono text-sm md:text-base text-white/90 tracking-[0.3em] uppercase">
                        {displaySubtitle}
                    </span>
                    <div className="h-[1px] w-12 bg-white/70" />
                </motion.div>

                {/* Main Title */}
                <h1 className="text-[14vw] leading-[0.85] font-display font-black text-white tracking-tighter text-center uppercase mix-blend-overlay drop-shadow-2xl whitespace-pre-line">
                    {displayTitle}
                </h1>

                {/* Subtitle / Location */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 flex gap-8 font-mono text-xs text-accent-dim uppercase tracking-widest"
                >
                    <span>London</span>
                    <span>•</span>
                    <span>Worldwide</span>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-30 mix-blend-difference"
            >
                <span className="text-xs uppercase tracking-[0.5em] font-mono">Scroll</span>
                <div className="w-[1px] h-12 bg-white/50 animate-pulse" />
            </motion.div>
        </div>
    );
}
