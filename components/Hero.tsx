"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// Image set for the rapid-fire montage
const MOMENTS = [
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80", // Club Haze
    "https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80", // Midnight Bass
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80", // Crowd Control
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80", // Neon Dreams
    "https://images.unsplash.com/photo-1514525253440-b393452e2729?auto=format&fit=crop&q=80", // Main Stage
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80", // Festival Soul
    "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80", // Techno Bunker
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 20]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);

    // Rapid Fire Montage Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % MOMENTS.length);
        }, 600); // Switch image every 600ms for a kinetic feel (approx 100bpm)

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="h-[250vh] relative bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 1. Rapid Fire Background Montage */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0.2, scale: 1.1 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={MOMENTS[currentImageIndex]}
                                alt="Background Moment"
                                fill
                                className="object-cover opacity-60 grayscale-[0.3] contrast-125 saturate-110"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Overlays for Vibe */}
                    <div className="absolute inset-0 bg-black/40" /> {/* Darken */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_90%)]" /> {/* Vignette */}
                </div>

                {/* 2. Strobe & Noise Overlay */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    {/* CSS Noise */}
                    <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />
                    {/* Strobe Flash */}
                    <div className="absolute inset-0 bg-white opacity-0 animate-[strobe_2s_infinite_ease-in-out] mix-blend-soft-light" />
                </div>


                {/* 3. Kinetic Text */}
                <motion.div
                    style={{ scale, opacity }}
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
                            Music & Nightlife Photography
                        </span>
                        <div className="h-[1px] w-12 bg-white/70" />
                    </motion.div>

                    {/* Main Title */}
                    <h1 className="text-[14vw] leading-[0.85] font-display font-black text-white tracking-tighter text-center uppercase mix-blend-overlay drop-shadow-2xl">
                        ROSS<br />DAVIDSON
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

                </motion.div>

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

            <style jsx global>{`
        @keyframes strobe {
            0%, 85% { opacity: 0; }
            86% { opacity: 0.1; }
            87% { opacity: 0; }
            88% { opacity: 0.2; }
            89% { opacity: 0; }
            100% { opacity: 0; }
        }
      `}</style>
        </div>
    );
}
