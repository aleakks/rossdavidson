"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { publicationsQuery, publicationsPageQuery } from "@/sanity/lib/queries";

interface Publication {
    _id: string;
    title: string;
    publisher: string;
    url: string;
    image?: any;
    ctaLabel?: string;
    order?: number;
}

const MOCK_IMAGES = [
    "photo-1470225620780-dba8ba36b745", // DJ Mag
    "photo-1516450360452-9312f5e86fc7", // Mixmag
    "photo-1501386761578-eac5c94b800a", // Defected Records
    "photo-1506157786151-b8491531f063", // Beatportal
    "photo-1514525253161-7a46d19cd819", // Resident Advisor
    "photo-1533174072545-7a4b6ad7a6c3", // Music Radar
    "photo-1459749411175-04bf5292ceea", // Vogue Music
    "photo-1516450360452-9312f5e86fc7"  // Dazed
];

const generateMockPublications = (): Publication[] => {
    const titles = [
        "Ross Davidson: Capturing Nightlife's Raw Energy",
        "Behind the Lens: The Art of Live Music Photography",
        "Defected Croatia 2025: The Official Photo Gallery",
        "Visual Identity in Modern Dance Music",
        "How Ross Davidson Captures Ibiza's Darkest Raves",
        "Touring with the World's Biggest DJs",
        "Nightlife Aesthetics: Editorial Meets Rave",
        "Behind the Stage: Printworks Closing Gallery"
    ];
    const publishers = [
        "DJ Mag",
        "Mixmag",
        "Defected Records",
        "Beatportal",
        "Resident Advisor",
        "Music Radar",
        "Vogue Music",
        "Dazed & Confused"
    ];
    const urls = [
        "https://djmag.com",
        "https://mixmag.net",
        "https://defected.com",
        "https://www.beatport.com",
        "https://ra.co",
        "https://www.musicradar.com",
        "https://vogue.com",
        "https://dazeddigital.com"
    ];

    return Array.from({ length: 8 }).map((_, i) => ({
        _id: `mock-pub-${i}`,
        title: titles[i],
        publisher: publishers[i],
        url: urls[i],
        ctaLabel: "Read Article",
        image: {
            mockUrl: `https://images.unsplash.com/${MOCK_IMAGES[i]}?q=80&w=1000`
        }
    }));
};

export default function PublicationsClient({ 
    publications, 
    pageSettings 
}: { 
    publications: Publication[], 
    pageSettings?: any 
}) {
    const [items, setItems] = useState<Publication[]>([]);
    const [settings, setSettings] = useState<any>(null);

    // Live Content Refresh (bypasses static caches on load)
    useEffect(() => {
        const fetchFreshData = async () => {
            try {
                const [freshPubs, freshSettings] = await Promise.all([
                    client.fetch<Publication[]>(publicationsQuery, { _t: Date.now() }, { filterResponse: false, cache: "no-store" }),
                    client.fetch(publicationsPageQuery, { _t: Date.now() }, { filterResponse: false, cache: "no-store" })
                ]);
                
                // @ts-ignore
                if (Array.isArray(freshPubs?.result) && freshPubs.result.length > 0) {
                    // @ts-ignore
                    setItems(freshPubs.result);
                }
                // @ts-ignore
                if (freshSettings?.result) {
                    // @ts-ignore
                    setSettings(freshSettings.result);
                }
            } catch (e) {
                console.error("Live publications fetch failed", e);
            }
        };

        if (publications && publications.length > 0) {
            setItems(publications);
        } else {
            setItems(generateMockPublications());
        }

        if (pageSettings) {
            setSettings(pageSettings);
        }

        fetchFreshData();
    }, [publications, pageSettings]);

    // Handle fallbacks for cover images
    const mockPubs = generateMockPublications();
    const displayItems = items.map((item, idx) => {
        const mock = mockPubs[idx] || mockPubs[0];
        return {
            ...item,
            image: item.image || mock.image,
            ctaLabel: item.ctaLabel || mock.ctaLabel || "Read Article",
            url: item.url || mock.url
        };
    });

    const getImageUrl = (imgObj: any) => {
        if (!imgObj) return "";
        if (imgObj.mockUrl) return imgObj.mockUrl;
        try {
            return urlFor(imgObj).width(800).quality(95).url();
        } catch {
            return "";
        }
    };

    return (
        <section className="container mx-auto px-6 pt-16">
            
            {/* Header Settings */}
            <div className="mb-16 md:mb-24">
                <span className="font-mono text-xs uppercase tracking-[0.5em] text-white/40 block mb-4">
                    {settings?.eyebrow || "Collection / 02"}
                </span>
                <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none text-white mb-6">
                    {settings?.title || "Publications"}
                </h1>
                <p className="font-sans text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                    {settings?.subtitle || "A curated archive of printed features, magazine covers, and digital editorials."}
                </p>
            </div>

            {/* Grid of Publications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-[1400px] mx-auto w-full pb-24">
                {displayItems.map((item, idx) => {
                    const imgUrl = getImageUrl(item.image);

                    return (
                        <motion.a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={item._id || idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
                            className="group block space-y-6 cursor-pointer"
                        >
                            {/* Hero Card Image Box */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-white/5 group-hover:border-white/20 transition-colors duration-500">
                                {imgUrl ? (
                                    <Image
                                        src={imgUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                        <span className="font-mono text-xs uppercase text-white/20">No Image Available</span>
                                    </div>
                                )}
                                
                                {/* Subtle grain texture overlay */}
                                <div 
                                    className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
                                />
                            </div>

                            {/* Info Block */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] block">
                                        {item.publisher}
                                    </span>
                                    
                                    {/* Link Icon Indicator */}
                                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                </div>
                                
                                <h3 className="text-white font-display text-2xl md:text-3xl uppercase tracking-tighter leading-tight group-hover:text-white/80 transition-colors">
                                    {item.title}
                                </h3>

                                <div className="pt-2">
                                    <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-white border-b border-white/20 group-hover:border-white pb-1 transition-colors">
                                        {item.ctaLabel}
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    );
                })}
            </div>

        </section>
    );
}
