import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function Footer() {
    const settings = await client.fetch(settingsQuery, {}, { next: { revalidate: 60 } });

    // Fallbacks
    const footerText = settings?.footerText || "Capturing the energy of music and nightlife culture worldwide.";
    const socialLinks = settings?.socialLinks || [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "LinkedIn", url: "https://linkedin.com" }
    ];

    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8 mb-24">

                    {/* Brand / Intro */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="text-2xl md:text-3xl font-display uppercase tracking-tighter">
                            Ross Davidson
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs font-sans">
                            {footerText}
                        </p>
                    </div>

                    {/* Quick Links (Sitemap) */}
                    <div className="md:col-start-3 md:col-span-1 space-y-6">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-white/30">Explore</h4>
                        <ul className="space-y-4 font-mono text-sm uppercase tracking-wider text-white/70">
                            <li><Link href="/#work" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/info" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/journal" className="hover:text-white transition-colors">Journal</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div className="md:col-span-1 space-y-6">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-white/30">Connect</h4>
                        <ul className="space-y-4 font-mono text-sm uppercase tracking-wider text-white/70">
                            <li>
                                <a href="mailto:studio@rossdavidson.com" className="hover:text-white transition-colors flex items-center gap-2 break-all md:break-normal">
                                    studio@rossdavidson.com
                                </a>
                            </li>
                            {socialLinks.map((link: any, i: number) => (
                                <li key={i}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        {link.platform}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4">
                            <Link href="/#contact" className="inline-block border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
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
                        <span>•</span>
                        <span>London • Worldwide</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
