export default function Footer() {
    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="text-2xl md:text-3xl font-display uppercase tracking-tighter">
                            Ross Davidson
                        </div>
                        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-white/40">
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">Email</a>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col md:items-end gap-2 text-white/30 font-mono text-[10px] uppercase tracking-widest">
                        <span>© {new Date().getFullYear()} Ross Davidson Photo.</span>
                        <span>All Rights Reserved.</span>
                        <span>London • Worldwide</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
