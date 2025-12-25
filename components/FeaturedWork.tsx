"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { FeaturedSettings } from "@/lib/api";

export default function FeaturedWork({ heading, blocks }: FeaturedSettings) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <section className="bg-black py-24 relative z-10">

            {/* Section Heading */}
            <div className="container mx-auto px-6 mb-16">
                <h2 className="text-xs font-mono tracking-[0.5em] text-white/60 uppercase border-b border-white/20 pb-4 inline-block">
                    {heading}
                </h2>
            </div>

            {/* Large Image Blocks */}
            <div className="flex flex-col gap-0">
                {blocks.map((block, index) => (
                    <div key={index} className="relative w-full h-[85vh] group overflow-hidden border-b border-white/10">

                        {/* Background Image with Parallax-ish Reveal */}
                        <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                            <Image
                                src={block.image}
                                alt={block.title}
                                fill
                                className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                            <div className="overflow-hidden">
                                <motion.h3
                                    initial={{ y: 0 }}
                                    whileInView={{ y: 0 }}
                                    className="text-[8vw] md:text-[6vw] font-display font-black text-white uppercase leading-[0.85] tracking-tighter mix-blend-difference"
                                >
                                    {block.title}
                                </motion.h3>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-white/30 pt-4 max-w-2xl">
                                <p className="font-mono text-sm md:text-base text-white/80 uppercase tracking-widest">
                                    {block.description}
                                </p>

                                <span className="hidden md:block w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
