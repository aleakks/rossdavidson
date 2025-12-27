import { client } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";

async function getServices() {
    return await client.fetch(servicesQuery, {}, { next: { revalidate: 60 } }) || [];
}

export default async function Services() {
    const services = await getServices();

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
                            {services.length > 0 ? (
                                services.map((service: any, i: number) => (
                                    <li key={i} className="group cursor-pointer">
                                        <div className="flex items-baseline gap-4 border-b border-white/10 pb-8 transition-colors group-hover:border-white/40">
                                            <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                                            <h3 className="text-3xl md:text-6xl font-display font-light text-white/80 group-hover:text-white transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-white/40 font-mono">No services listed.</p>
                            )}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    )
}
