"use client";


import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const isHome = pathname === "/";

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const links = [
        { name: "Work", href: isHome ? "#work" : "/#work" },
        { name: "Services", href: "/info" }, // Renamed from Approach
        { name: "About", href: isHome ? "#about" : "/#about" },
        { name: "Journal", href: "/journal" },
        // Contact removed from list, will be button
    ];

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:py-6 text-white pointer-events-none backdrop-blur-md bg-black/50 border-b border-white/5"
            >
                <div className="container mx-auto flex justify-between md:justify-center items-center relative">

                    {/* Desktop Nav */}
                    <nav className="pointer-events-auto hidden md:flex gap-12 items-center">
                        {!isHome && (
                            <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
                                Home
                            </Link>
                        )}
                        {links.map((link) => (
                            <Link key={link.name} href={link.href} className="font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
                                {link.name}
                            </Link>
                        ))}

                        {/* Desktop CTA */}
                        <Link
                            href={isHome ? "#contact" : "/#contact"}
                            className="ml-4 px-6 py-2 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            Enquire
                        </Link>
                    </nav>

                    {/* Mobile Header: Menu Button Right */}
                    <div className="md:hidden pointer-events-auto w-full flex justify-end">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="uppercase font-mono text-xs tracking-widest z-[101] relative mix-blend-difference">
                            {mobileMenuOpen ? "Close" : "Menu"}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Fixed CTA - Always visible */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 right-6 z-[98] md:hidden pointer-events-auto"
            >
                <Link
                    href={isHome ? "#contact" : "/#contact"}
                    className="flex items-center justify-center w-auto px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
                >
                    Enquire
                </Link>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[99] bg-black text-white flex flex-col justify-center items-center gap-8 md:hidden"
                    >
                        {!isHome && (
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-display text-4xl uppercase tracking-tighter"
                            >
                                Home
                            </Link>
                        )}
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-display text-4xl uppercase tracking-tighter"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {/* Mobile Menu Duplicate CTA - Optional, but we have the floating one. Adding it here too for completeness if they look for it in menu. */}
                        <Link
                            href={isHome ? "#contact" : "/#contact"}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-display text-4xl uppercase tracking-tighter text-white/50"
                        >
                            Contact
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
