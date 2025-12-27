import { client } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";

// Import contactQuery to get licensing text
import { contactQuery } from "@/sanity/lib/queries";

async function getData() {
    const [services, contact] = await Promise.all([
        client.fetch(servicesQuery, {}, { next: { revalidate: 60 } }),
        client.fetch(contactQuery, {}, { next: { revalidate: 60 } })
    ]);
    return { services, contact };
}

export default async function Services() {
    const { services: dataServices, contact: dataContact } = await getData();

    // Fallback if no data
    const services = dataServices?.length > 0 ? dataServices : [
        {
            title: "Touring & Live Events",
            description: "Full tour coverage, backstage access, and immediate image delivery for social media. Capturing the raw energy of the performance and the intimate moments in between."
        },
        {
            title: "Editorial & Press",
            description: "Styled photo shoots, magazine features, and album artwork. Concept-driven imagery that defines artist identity."
        },
        {
            title: "Brand Activation",
            description: "Coverage for culture-led brand events, product launches, and nightlife marketing. Creating authentic visual assets that resonate with the audience."
        }
    ];

    const licensingText = dataContact?.licensingText || "All commercial work includes tailored licensing usage rights. Full buyouts available upon request.";

    return (
        <section className="bg-black text-white py-24 md:py-32 border-t border-white/10 relative z-10" id="info">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:grid md:grid-cols-12 gap-12">

                    {/* Section Label */}
                    <div className="col-span-12 md:col-span-4">
                        <div className="sticky top-32">
                            <h2 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-8 opacity-0 animate-fade-in-up"
                                style={{ animationFillMode: 'forwards' }}>
                                (02) Capabilities
                            </h2>
                            <p className="max-w-xs text-white/60 font-sans text-sm leading-relaxed mb-8">
                                A multidisciplinary approach to visual storytelling, blending technical precision with raw emotion.
                            </p>

                            {/* Licensing & Rights Mention */}
                            <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
                                <h3 className="font-display uppercase text-lg mb-2">Licensing & Rights</h3>
                                <p className="text-xs text-white/50 leading-relaxed font-mono">
                                    {licensingText}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* The List (The Breather) */}
                    <div className="col-span-12 md:col-span-8">
                        <ul className="space-y-12">
                            {services.map((service: any, i: number) => (
                                <li key={i} className="group">
                                    <div className="flex flex-col border-b border-white/10 pb-8 transition-colors group-hover:border-white/40">
                                        <div className="flex items-baseline gap-4 mb-4">
                                            <span className="font-mono text-xs text-white/30 transition-colors group-hover:text-white/60">0{i + 1}</span>
                                            <h3 className="text-3xl md:text-5xl font-display font-light text-white/80 group-hover:text-white transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                        </div>
                                        <p className="pl-8 md:pl-10 text-white/50 max-w-xl font-sans text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors">
                                            {service.description}
                                        </p>
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
