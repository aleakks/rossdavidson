"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";

export default function Contact() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormState('success');
    };

    return (
        <section id="contact" className="bg-black relative z-10 border-t border-white/20">

            {/* The Grid Container - Responsive borders */}
            <div className="flex flex-col md:grid md:grid-cols-12 min-h-[90vh]">

                {/* 1. Header / Context (Left Sidebar on Desktop) */}
                <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-white/20 p-8 md:p-12 flex flex-col justify-between bg-zinc-950/50">
                    <div>
                        <div className="mb-12">
                            <span className="font-mono text-xs uppercase tracking-[0.5em] text-white/40 block mb-4">
                                Section 04
                            </span>
                            <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.8]">
                                Let's<br />Work
                            </h2>
                        </div>
                        <p className="font-sans text-white/50 text-lg leading-relaxed max-w-sm">
                            Seeking projects that challenge the norm. <br />
                            Fashion, Music, Art Direction.
                        </p>
                    </div>

                    {/* Middle Content - Services & Status to fill the void */}
                    <div className="space-y-8 my-12 md:my-0">
                        <div className="space-y-4">
                            <h3 className="font-mono text-xs text-white/30 uppercase tracking-widest">Capabilities</h3>
                            <ul className="text-white/80 font-mono text-sm space-y-2 uppercase tracking-wider">
                                <li>Editorial Photography</li>
                                <li>Commercial Campaign</li>
                                <li>Creative Direction</li>
                                <li>Moving Image</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-mono text-xs text-white/30 uppercase tracking-widest">Status</h3>
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-white/80 font-mono text-sm uppercase tracking-wider">Accepting New Projects</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 md:mt-0">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Direct Line</div>
                        <a href="mailto:studio@rossdavidson.com" className="text-xl text-white font-sans hover:text-white/70 transition-colors flex items-center gap-2 group">
                            studio@rossdavidson.com
                            <ArrowDownRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400" />
                        </a>
                    </div>
                </div>

                {/* 2. The Form (Right Main Content) */}
                <div className="col-span-12 md:col-span-8 p-8 md:p-12 flex flex-col justify-center relative">
                    {/* Background Grid Lines (Subtle) */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto w-full space-y-16">

                        {/* Huge Input Fields - Font size reduced to xl/3xl for usability */}
                        <div className="space-y-12">

                            {/* Name */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white transition-colors">
                                    (01) Who are you?
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="YOUR NAME"
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl md:text-3xl font-display font-bold text-white uppercase focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                                />
                            </div>

                            {/* Email */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white transition-colors">
                                    (02) How to reach you?
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="EMAIL ADDRESS"
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl md:text-3xl font-display font-bold text-white uppercase focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                                />
                            </div>

                            {/* Message */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white transition-colors">
                                    (03) The Vision?
                                </label>
                                <textarea
                                    required
                                    rows={1} // Auto-grow can be added, but standard 1 row looks cleaner initially for this style
                                    placeholder="TELL ME ABOUT IT"
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-xl md:text-3xl font-display font-bold text-white uppercase focus:outline-none focus:border-white transition-all resize-none placeholder:text-white/5 min-h-[80px]"
                                    style={{ fieldSizing: "content" } as any} // Modern CSS for auto-grow
                                />
                            </div>

                        </div>

                        {/* Footer / Submit */}
                        <div className="flex justify-between items-end pt-8">
                            <div className="hidden md:block font-mono text-xs text-white/20 uppercase max-w-[200px] leading-relaxed">
                                By submitting this form you acknowledge that great work takes time and energy.
                            </div>

                            <motion.button
                                whileHover={{ x: 10 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={formState !== 'idle'}
                                className={`flex items-center gap-4 text-xl md:text-2xl font-mono uppercase tracking-widest transition-colors ${formState === 'idle' ? 'text-white hover:text-white/70' : 'text-white/50'}`}
                            >
                                {formState === 'idle' ? 'Submit Request' : 'Transmission...'}
                                <ArrowRight className="w-8 h-8" />
                            </motion.button>
                        </div>

                    </form>
                </div>

            </div>
        </section>
    );
}
