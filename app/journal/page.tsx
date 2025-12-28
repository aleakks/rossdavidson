import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { journalListQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Journal",
    description: "Editorial stories, behind-the-scenes case studies, and insights into the creative process of Ross Davidson.",
};

export const revalidate = 60; // ISR

export default async function JournalIndex() {
    const posts = await client.fetch(journalListQuery);

    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-24 px-6">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-8xl font-display uppercase font-black tracking-tighter mb-24 opacity-20">
                    The Journal
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {posts.map((entry: any) => (
                        <Link href={`/journal/${entry.slug}`} key={entry.slug} className="group block space-y-6">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 border border-white/10">
                                {entry.coverImage ? (
                                    <Image
                                        src={urlFor(entry.coverImage).width(1200).height(900).url()}
                                        alt={entry.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-white/5" />
                                )}
                            </div>

                            {/* Text */}
                            <div className="flex justify-between items-start border-t border-white/20 pt-6">
                                <div className="space-y-2 max-w-md">
                                    <div className="flex gap-4 text-xs font-mono uppercase tracking-widest text-white/50">
                                        <span>Journal</span>
                                        <span>—</span>
                                        <span>
                                            {new Date(entry.publishedAt).toLocaleDateString("en-GB", {
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tighter group-hover:text-white/70 transition-colors">
                                        {entry.title}
                                    </h2>
                                </div>

                                <span className="hidden md:block font-mono text-xs uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                                    Read
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
