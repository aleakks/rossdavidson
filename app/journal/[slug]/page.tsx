import Link from "next/link";
import Image from "next/image";
import { getJournalEntry, journalEntries } from "@/lib/journal";
import { notFound } from "next/navigation";

// Generate static params for export
export function generateStaticParams() {
    return journalEntries.map((entry) => ({
        slug: entry.slug,
    }));
}

export default async function JournalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = getJournalEntry(slug);

    if (!entry) {
        notFound();
    }

    return (
        <main className="bg-black min-h-screen text-white">

            {/* Hero Header */}
            <div className="relative h-[70vh] w-full bg-neutral-900">
                <Image
                    src={entry.coverImage}
                    alt={entry.title}
                    fill
                    priority
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="container mx-auto">
                        <Link href="/journal" className="inline-block mb-8 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                            ← Back to Journal
                        </Link>
                        <h1 className="text-4xl md:text-7xl font-display uppercase font-black tracking-tighter max-w-4xl">
                            {entry.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Metadata Sidebar */}
                    <div className="md:col-span-3 space-y-12">
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Date</h3>
                            <p className="font-sans text-lg">{entry.date}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Credits</h3>
                            <ul className="space-y-2">
                                {entry.credits.map((credit, i) => (
                                    <li key={i} className="font-sans text-sm text-white/80">
                                        <span className="text-white/40 block text-[10px] uppercase tracking-wider">{credit.role}</span>
                                        {credit.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Story */}
                    <div className="md:col-span-9 space-y-24">
                        <p className="text-xl md:text-2xl font-sans leading-relaxed text-white/80 max-w-3xl">
                            {entry.description}
                        </p>

                        {/* Image Grid */}
                        <div className="space-y-8 md:space-y-24">
                            {entry.images.map((img, index) => (
                                <div key={index} className="relative w-full aspect-[3/2] bg-neutral-900 overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`Moment ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
