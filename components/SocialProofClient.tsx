"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { socialProofQuery } from "@/sanity/lib/queries";

interface SocialProofClientProps {
    clients: string[];
    callout?: string;
}

export default function SocialProofClient({ clients, callout }: SocialProofClientProps) {
    const [liveData, setLiveData] = useState<any>(null);

    useEffect(() => {
        const fetchFresh = async () => {
            try {
                const fresh = await client.fetch(socialProofQuery, { _t: Date.now() }, { filterResponse: false, cache: 'no-store' });
                // @ts-ignore
                if (fresh?.result) {
                    // @ts-ignore
                    setLiveData(fresh.result);
                }
            } catch (e) {
                console.error("Social proof fetch failed", e);
            }
        };
        fetchFresh();
    }, []);

    const displayClients = liveData?.clients || clients;
    const displayCallout = liveData?.primaryCallout || callout;

    if (!displayClients || displayClients.length === 0) return null;

    return (
        <section className="bg-black py-20 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 text-center">
                {/* Primary Callout */}
                <div className="mb-16">
                    <h2 className="text-xl md:text-3xl font-display uppercase tracking-wider text-white">
                        {displayCallout || "Featured in & Trusted by"}
                    </h2>
                </div>

                {/* Logo Grid (Visual Authority - Item 3) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
                    {displayClients.map((client: string, index: number) => (
                        <div
                            key={index}
                            className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        >
                            {/* Placeholder for Logo Image - Using Stylized Text as "Logos" for now until SVGs are provided */}
                            <span className="text-xl md:text-2xl font-display font-black uppercase tracking-tighter text-white cursor-default text-center">
                                {client}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
