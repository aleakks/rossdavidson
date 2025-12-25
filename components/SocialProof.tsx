"use client";

import { motion } from "framer-motion";

const clients = [
    "Annie Mac",
    "skrillex",
    "blondish",
    "realblackcoffee",
    "followthefishtv",
    "adriatique",
];

export default function SocialProof() {
    return (
        <section className="bg-black py-20 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-xs font-mono tracking-[0.5em] text-white/40 uppercase text-center md:text-left">
                    Featured In & Trusted By
                </h2>
            </div>

            {/* Scrolling Ticker on Mobile / Grid on Desktop */}
            <div className="relative w-full overflow-hidden">

                {/* Desktop Grid (Clean, structured) */}
                <div className="hidden md:flex justify-between items-center px-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {clients.map((client, index) => (
                        <div key={index} className="text-xl md:text-2xl font-display uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-default">
                            {/* Placeholder for Logos - using text for now */}
                            {client}
                        </div>
                    ))}
                </div>

                {/* Mobile Marquee (Dynamic) */}
                <div className="md:hidden flex whitespace-nowrap overflow-hidden mask-linear-fade">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="flex gap-12"
                    >
                        {[...clients, ...clients, ...clients].map((client, index) => (
                            <span key={index} className="text-xl font-display uppercase tracking-widest text-white/50">
                                {client}
                            </span>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
