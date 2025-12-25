"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <section className="bg-black py-24 md:py-32 relative z-10 border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Header */}
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <h2 className="text-xs font-mono tracking-[0.5em] text-white/60 uppercase border-b border-white/20 pb-4 inline-block mb-8">
                        Inquiries
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none">
                        Let's Create <br /> <span className="text-white/40">Something Iconic.</span>
                    </h3>
                </div>

                {/* Form */}
                <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Name */}
                        <div className="relative group">
                            <label className={`absolute left-0 transition-all duration-300 font-mono text-xs uppercase tracking-widest ${focusedField === 'name' ? '-top-6 text-white' : 'top-2 text-white/40'}`}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                onFocus={() => setFocusedField('name')}
                                onBlur={(e) => !e.target.value && setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans text-lg focus:outline-none focus:border-white transition-colors rounded-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <label className={`absolute left-0 transition-all duration-300 font-mono text-xs uppercase tracking-widest ${focusedField === 'email' ? '-top-6 text-white' : 'top-2 text-white/40'}`}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                onFocus={() => setFocusedField('email')}
                                onBlur={(e) => !e.target.value && setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans text-lg focus:outline-none focus:border-white transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Project Type */}
                        <div className="relative group">
                            <select
                                onFocus={() => setFocusedField('type')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans text-lg focus:outline-none focus:border-white transition-colors appearance-none rounded-none"
                            >
                                <option value="" className="bg-black text-white/40">Select Project Type</option>
                                <option value="editorial" className="bg-black text-white">Editorial / Fashion</option>
                                <option value="commercial" className="bg-black text-white">Commercial Campaign</option>
                                <option value="wedding" className="bg-black text-white">Music / Tour</option>
                                <option value="other" className="bg-black text-white">Other</option>
                            </select>
                            <label className="absolute -top-6 left-0 text-white font-mono text-xs uppercase tracking-widest">
                                Interest
                            </label>
                        </div>

                        {/* Budget (Optional) */}
                        <div className="relative group">
                            <label className={`absolute left-0 transition-all duration-300 font-mono text-xs uppercase tracking-widest ${focusedField === 'budget' ? '-top-6 text-white' : 'top-2 text-white/40'}`}>
                                Budget (Optional)
                            </label>
                            <input
                                type="text"
                                onFocus={() => setFocusedField('budget')}
                                onBlur={(e) => !e.target.value && setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans text-lg focus:outline-none focus:border-white transition-colors rounded-none"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="relative group mt-8">
                        <label className={`absolute left-0 transition-all duration-300 font-mono text-xs uppercase tracking-widest ${focusedField === 'message' ? '-top-6 text-white' : 'top-2 text-white/40'}`}>
                            Tell me about your vision
                        </label>
                        <textarea
                            rows={4}
                            onFocus={() => setFocusedField('message')}
                            onBlur={(e) => !e.target.value && setFocusedField(null)}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans text-lg focus:outline-none focus:border-white transition-colors resize-none rounded-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8 flex justify-end">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-12 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
                        >
                            Send Request
                        </motion.button>
                    </div>

                </form>
            </div>
        </section>
    );
}
