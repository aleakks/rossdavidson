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

                {/* Logo Grid (Visual Authority - Item 3) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
                    {clients.map((client, index) => (
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
