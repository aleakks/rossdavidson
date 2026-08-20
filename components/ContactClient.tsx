"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { contactQuery } from "@/sanity/lib/queries";

interface ContactFormProps {
    capabilities?: string[];
    status?: string;
    email?: string;
    title?: string;
    description?: string;
    disclaimer?: string;
}

export default function ContactClient({ 
    capabilities: initialCapabilities = ["Editorial Photography", "Commercial Campaign", "Live Events", "Creative Direction", "Moving Image"], 
    email: initialEmail = "contact@rossdavidsonphoto.com", 
    title: initialTitle = "Let's Work"
}: ContactFormProps) {
    const [liveData, setLiveData] = useState<any>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch(contactQuery, { _t: Date.now() }, { filterResponse: false, cache: 'no-store' });
                // @ts-ignore
                if (fresh?.result) setLiveData(fresh.result);
            } catch (e) { console.error("Contact settings fetch failed", e); }
        };
        fetchFresh();
    }, []);

    const title = liveData?.title || initialTitle;
    const rawCapabilities = liveData?.capabilities || initialCapabilities;
    const capabilities = rawCapabilities.map((cap: string) =>
        cap === "Touring" || cap === "Music/Touring" ? "Live Events" : cap
    );
    const email = liveData?.email || initialEmail;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Anti-bot honeypot validation
        if (formData.get("botcheck")) {
            console.warn("Spam bot detected via honeypot.");
            setFormState('success');
            form.reset();
            return;
        }

        setFormState('sending');
        const object = Object.fromEntries(formData);
        object.access_key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            });

            const data = await response.json();

            if (data.success) {
                setFormState('success');
                form.reset();
                alert("Thank you! Your request has been sent successfully.");
                setTimeout(() => setFormState('idle'), 3000);
            } else {
                console.error("Form submission error:", data);
                setFormState('idle');
                alert(data.message || "Something went wrong. Please try again.");
            }
        } catch (error: any) {
            console.error("Form submit network error:", error);
            setFormState('idle');
            alert("Network error. Please try again or reach out directly via email.");
        }
    };

    return (
        <section id="contact" className="min-h-screen bg-black text-white relative flex flex-col justify-between border-t border-white/5">
            {/* Main Content: Split Grid */}
            <div className="container mx-auto px-6 py-20 flex-grow flex flex-col justify-center">
                <div className="grid grid-cols-12 border border-white/20 bg-zinc-950/20 backdrop-blur-sm min-h-[600px]">

                    {/* 1. Header / Context (Left Sidebar on Desktop) */}
                    <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-white/20 p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between bg-zinc-950/50">
                        <div>
                            {/* Main Title - Large Editorial Focus */}
                            <h2 className="text-6xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8.5rem] font-display font-black uppercase tracking-tighter text-white leading-[0.85] mb-8 md:mb-12">
                                {title}
                            </h2>

                            {/* Capabilities List */}
                            <div className="space-y-4 pt-2">
                                <div className="font-mono text-xs text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">Capabilities</div>
                                <ul className="space-y-2.5 font-mono text-xs md:text-sm text-neutral-300 uppercase tracking-wider">
                                    {capabilities.map((cap: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                            <span>{cap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Direct Email Link */}
                        <div className="mt-8 md:mt-0 pt-6 border-t border-white/10">
                            <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Email</div>
                            <a href={`mailto:${email}`} className="text-lg md:text-xl text-white font-sans hover:text-white/70 transition-colors flex items-center gap-2 group break-all md:break-normal">
                                {email}
                                <ArrowDownRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400 shrink-0" />
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
                            {/* Anti-Bot Honeypot Field */}
                            <input 
                                type="checkbox" 
                                name="botcheck" 
                                className="hidden" 
                                style={{ display: 'none' }} 
                                tabIndex={-1} 
                                autoComplete="off" 
                            />

                            {/* Form Fields */}
                            <div className="space-y-10">

                            {/* Name / Company */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors">
                                    Name / Company
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="WHO ARE YOU?"
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-xl md:text-2xl font-display font-medium text-white uppercase focus:outline-none focus:border-white transition-all placeholder:text-white/20"
                                />
                            </div>

                            {/* Email */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="WHERE TO REPLY?"
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-xl md:text-2xl font-display font-medium text-white uppercase focus:outline-none focus:border-white transition-all placeholder:text-white/20"
                                />
                            </div>

                            {/* Project Type Dropdown */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors">
                                    Project Type
                                </label>
                                <select
                                    name="project_type"
                                    required
                                    onFocus={() => setFocusedField('type')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-black border-b border-white/20 py-3 text-xl md:text-2xl font-display font-medium text-white uppercase focus:outline-none focus:border-white transition-all appearance-none cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-white/20">Select Option</option>
                                    <option value="tour">Tour Coverage</option>
                                    <option value="event">Event / Festival</option>
                                    <option value="editorial">Editorial / Press</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Location & Dates */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors">
                                    Location & Dates
                                </label>
                                <input
                                    type="text"
                                    name="location_dates"
                                    placeholder="WHEN & WHERE?"
                                    onFocus={() => setFocusedField('location')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-xl md:text-2xl font-display font-medium text-white uppercase focus:outline-none focus:border-white transition-all placeholder:text-white/20"
                                />
                            </div>

                            {/* Message / Details */}
                            <div className="group relative">
                                <label className="absolute -top-4 left-0 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors">
                                    Project Details
                                </label>
                                <textarea
                                    name="details"
                                    required
                                    rows={2}
                                    placeholder="e.g. Live show in London, 2 nights, image delivery for press and social media."
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-xl md:text-2xl font-display font-medium text-white uppercase focus:outline-none focus:border-white transition-all resize-none placeholder:text-white/20 min-h-[100px]"
                                />
                            </div>

                        </div>

                        {/* Footer / Submit */}
                        <div className="flex justify-end items-center pt-8">
                            <motion.button
                                whileHover={{ x: 10 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={formState !== 'idle'}
                                className={`flex items-center gap-4 text-xl md:text-2xl font-mono uppercase tracking-widest transition-colors ${formState === 'idle' ? 'text-white hover:text-white/70' : 'text-white/50'}`}
                            >
                                {formState === 'idle' ? 'Submit Request' : formState === 'sending' ? 'Sending...' : 'Sent Successfully!'}
                                <ArrowRight className="w-8 h-8" />
                            </motion.button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </section>
);
}
