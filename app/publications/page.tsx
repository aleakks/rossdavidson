import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Publications & Editorial",
    description: "Selected editorial covers, feature articles, and printed publications by Ross Davidson.",
};

export default function PublicationsPage() {
    return (
        <main className="bg-black min-h-screen text-white flex items-center justify-center pt-24 px-6 relative overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
            {/* Noise Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="max-w-2xl text-center space-y-8 z-10">
                <span className="font-mono text-xs uppercase tracking-[0.5em] text-white/40 block">
                    Collection / 02
                </span>
                <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none text-white">
                    Publications
                </h1>
                <p className="font-sans text-white/60 text-lg leading-relaxed max-w-md mx-auto">
                    A curated archive of printed features, magazine covers, and digital editorials. This section is currently in production.
                </p>
                <div className="pt-8">
                    <Link href="/" className="inline-block border border-white/20 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}
