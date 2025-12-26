"use client";

export default function Services() {
    const services = [
        "Creative Direction",
        "Editorial Photography",
        "Moving Image",
        "Commerical Campaign",
        "Brand Strategy"
    ];

    return (
        <section className="bg-black text-white py-24 md:py-32 border-t border-white/10 relative z-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:grid md:grid-cols-12 gap-12">

                    {/* Section Label */}
                    <div className="col-span-12 md:col-span-4">
                        <div className="sticky top-32">
                            <h2 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-8 opacity-0 animate-fade-in-up"
                                style={{ animationFillMode: 'forwards' }}>
                                (02) Capabilities
                            </h2>
                            <p className="max-w-xs text-white/60 font-sans text-sm leading-relaxed">
                                A multidisciplinary approach to visual storytelling, blending technical precision with raw emotion.
                            </p>
                        </div>
                    </div>

                    {/* The List (The Breather) */}
                    <div className="col-span-12 md:col-span-8">
                        <ul className="space-y-8">
                            {services.map((service, i) => (
                                <li key={i} className="group cursor-pointer">
                                    <div className="flex items-baseline gap-4 border-b border-white/10 pb-8 transition-colors group-hover:border-white/40">
                                        <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                                        <h3 className="text-3xl md:text-6xl font-display font-light text-white/80 group-hover:text-white transition-colors duration-300">
                                            {service}
                                        </h3>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    )
}
