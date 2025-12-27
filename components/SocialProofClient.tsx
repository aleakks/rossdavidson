"use client";

interface SocialProofClientProps {
    clients: string[];
    callout?: string;
}

export default function SocialProofClient({ clients, callout }: SocialProofClientProps) {
    if (!clients || clients.length === 0) return null;

    return (
        <section className="bg-black py-20 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 text-center">
                <h2 className="text-xs font-mono tracking-[0.5em] text-white/40 uppercase mb-8">
                    Featured In & Trusted By
                </h2>

                {/* Primary Callout */}
                <div className="mb-16">
                    <p className="text-xl md:text-3xl font-display uppercase tracking-wider text-white">
                        {callout || "Official Tour Photographer for Skrillex – 2024"}
                    </p>
                </div>

                {/* Logo Grid (Simulated with Text) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-50 hover:opacity-100 transition-opacity duration-500">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            <span className="text-lg md:text-xl font-display uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-default text-center">
                                {client}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
