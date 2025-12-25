"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="bg-black py-24 md:py-32 relative z-10 border-t border-white/5">
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
                            src="/images/uploads/artist-image.jpg"
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
                            <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                                Capturing the <span className="text-white/40">Electricity</span> of the Moment.
                            </h3>
                            <p className="font-sans text-white/70 text-lg leading-relaxed max-w-lg">
                                [Placeholder Bio] Ross Davidson is a London-based photographer specializing in high-energy nightlife and editorial fashion. With a background in [X], he brings a cinematic quality to every frame, focusing on raw emotion and atmospheric lighting.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-mono tracking-[0.3em] text-white/50 uppercase">
                                Philosophy
                            </h4>
                            <p className="font-sans text-white/70 text-base leading-relaxed max-w-lg border-l-2 border-white/20 pl-6 italic">
                                "This is a placeholder for your artist statement or philosophy. Use this space to talk about why you shoot, not just what you shoot. Clients connect with the 'why'."
                            </p>
                        </div>

                        {/* Signature / Name */}
                        <div className="pt-8">
                            <div className="text-2xl font-display uppercase tracking-widest text-white">Ross Davidson</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
