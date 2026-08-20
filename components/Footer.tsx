"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";

export default function Footer({ settings }: { settings: any }) {
    const [liveSettings, setLiveSettings] = useState<any>(null);

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch(settingsQuery, { _t: Date.now() }, { filterResponse: false, cache: 'no-store' });
                // @ts-ignore
                if (fresh?.result) setLiveSettings(fresh.result);
            } catch (e) { console.error("Settings fetch failed", e); }
        };
        fetchFresh();
    }, []);

    const currentSettings = liveSettings || settings;

    // Fallbacks
    const footerText = currentSettings?.footerText || "Capturing the energy of music and nightlife culture worldwide.";
    const socialLinks = currentSettings?.socialLinks || [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "LinkedIn", url: "https://linkedin.com" }
    ];

    // Extract email dynamic link and filter duplicates
    const emailLink = socialLinks.find((link: any) => link.platform.toLowerCase() === 'email');
    const emailAddress = emailLink ? emailLink.url.replace(/^mailto:/i, "") : "contact@rossdavidsonphoto.com";
    const emailMailto = emailLink ? emailLink.url : `mailto:${emailAddress}`;
    const filteredSocialLinks = socialLinks.filter((link: any) => link.platform.toLowerCase() !== 'email');

    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8 items-center mb-16 md:mb-20">

                    {/* Brand / Intro */}
                    <div className="md:col-span-2">
                        <div className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9]">
                            Ross Davidson
                        </div>
                    </div>

                    {/* Quick Links (Sitemap) */}
                    <div className="md:col-span-1 space-y-4">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-white/30">Explore</h4>
                        <ul className="space-y-3 font-mono text-sm uppercase tracking-wider text-white/70">
                            <li><Link href="/live" className="hover:text-white transition-colors">Live</Link></li>
                            <li><Link href="/publications" className="hover:text-white transition-colors">Publications</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div className="md:col-span-1 space-y-4">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-white/30">Connect</h4>
                        <ul className="space-y-3 font-mono text-sm uppercase tracking-wider text-white/70">
                            <li>
                                <a href={emailMailto} className="hover:text-white transition-colors flex items-center gap-2 break-all md:break-normal">
                                    {emailAddress}
                                </a>
                            </li>
                            {filteredSocialLinks.map((link: any, i: number) => (
                                <li key={i}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        {link.platform}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-2">
                            <Link href="/contact" className="inline-block border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                Start a Project
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 font-mono text-[10px] uppercase tracking-widest border-t border-white/5 pt-8">
                    <span>© {new Date().getFullYear()} Ross Davidson Photo.</span>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
