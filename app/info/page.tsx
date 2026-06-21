

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Approach & Services",
    description: "Bespoke photography commissions for fashion, music, and nightlife. View rates, service breakdowns, and the artist's philosophy.",
};

import { client } from "@/sanity/lib/client";
import { servicesQuery, infoPageQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function InfoPage() {
    let services = [];
    let pageSettings = null;

    try {
        [services, pageSettings] = await Promise.all([
            client.fetch(servicesQuery),
            client.fetch(infoPageQuery)
        ]);
    } catch (error) {
        console.error("Info page fetch error:", error);
    }

    // Default static FAQs if empty in Sanity
    const faqs = pageSettings?.faqs || [
        {
            question: "Do you travel?",
            answer: "Yes. Based in London but available worldwide. Travel expenses are calculated per project."
        },
        {
            question: "What is your turnaround time?",
            answer: "For events, a 'highlights' gallery is delivered within 24 hours. Full delivery typically takes 5-7 business days."
        }
    ];

    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-24 px-6">
            <div className="container mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-24 md:mb-32">
                    <h1 className="text-4xl md:text-8xl font-display uppercase font-black tracking-tighter opacity-20 mb-8">
                        {pageSettings?.approachTitle || "Approach"}
                    </h1>
                    <p className="font-sans text-xl md:text-2xl leading-relaxed text-white/80 max-w-2xl whitespace-pre-line">
                        {pageSettings?.approachDescription || "A bespoke approach to capturing nightlife, music, and editorial fashion. I don't just document events; I create iconic imagery that defines brands."}
                    </p>
                </div>

                {/* Services Grid (Dynamic from Sanity) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-32 border-t border-white/10 pt-16">
                    {services && services.map((service: any, i: number) => (
                        <div key={service._id || i} className="space-y-6">
                            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                                0{i + 1}
                            </h2>
                            <h3 className="text-3xl font-display uppercase tracking-tight">{service.title}</h3>
                            <p className="text-white/60 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Rates / Investment */}
                <div className="bg-neutral-900 border border-white/5 p-8 md:p-16 mb-24 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <h2 className="text-2xl font-display uppercase tracking-widest mb-2">
                                {pageSettings?.investmentTitle || "Investment"}
                            </h2>
                            <p className="text-white/60 max-w-md">
                                {pageSettings?.investmentDescription || "Because every project is unique, I provide bespoke quotes tailored to your specific requirements and usage rights."}
                            </p>
                        </div>
                        <Link href="/contact" className="px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-colors">
                            {pageSettings?.investmentCta || "Request Rate Card"}
                        </Link>
                    </div>

                    {/* Texture Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </div>

                {/* FAQ */}
                {faqs && faqs.length > 0 && (
                    <div className="max-w-2xl">
                        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-12 border-b border-white/10 pb-4 inline-block">
                            Common Questions
                        </h2>

                        <div className="space-y-12">
                            {faqs.map((faq: any, i: number) => (
                                <div key={i}>
                                    <h3 className="text-xl font-display uppercase tracking-wide mb-4">{faq.question}</h3>
                                    <p className="text-white/60 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
