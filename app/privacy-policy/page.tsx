import { client } from "@/sanity/lib/client";
import { privacyQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export const revalidate = 60; // Revalidate every minute

export default async function PrivacyPolicyPage() {
    const data = await client.fetch(privacyQuery);

    if (!data) {
        return notFound();
    }

    return (
        <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <header className="space-y-4 border-b border-white/10 pb-8">
                    <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tighter">
                        {data.title}
                    </h1>
                    <p className="font-mono text-xs uppercase tracking-widest text-white/50">
                        Last Updated: {new Date(data.updatedAt).toLocaleDateString()}
                    </p>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none font-sans font-light text-white/80">
                    <PortableText
                        value={data.content}
                        components={{
                            block: {
                                h2: ({ children }) => <h2 className="text-2xl font-display uppercase tracking-tight text-white mt-12 mb-6">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-display uppercase tracking-tight text-white mt-8 mb-4">{children}</h3>,
                                normal: ({ children }) => <p className="mb-6 leading-relaxed text-white/80">{children}</p>,
                            }
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
