"use client";


import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";


interface HeaderProps {
    links: { label: string; url: string; }[];
}

export default function Header({ links: passedLinks }: HeaderProps) {
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

    // Use passed links or default if empty (though layout provides default)
    // Also ensuring internal links handle home anchor correctly if needed, 
    // but the Sanity schema just gives full URLs or hashes. 
    // We might need to process them if they are purely hash links like "#work" vs "/#work".
    // For now, let's assume Sanity data is authoritative.
    const navLinks = passedLinks?.length > 0 ? passedLinks : [
        { label: "Work", url: isHome ? "#work" : "/#work" },
        { label: "Services", url: "/info" },
        { label: "About", url: isHome ? "#about" : "/#about" },
        { label: "Journal", url: "/journal" },
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
                        {navLinks.map((link) => (
                            <Link key={link.label} href={link.url} className="font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
                                {link.label}
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

                    {/* Mobile Header: CTA + Menu Button */}
                    <div className="md:hidden pointer-events-auto w-full flex justify-end gap-4 items-center">
                        {/* Mobile CTA - In Header (Item 6) */}
                        <Link
                            href={isHome ? "#contact" : "/#contact"}
                            className="px-4 py-2 bg-white text-black font-mono text-[10px] uppercase tracking-widest z-[101] relative hover:scale-105 transition-transform"
                        >
                            Enquire
                        </Link>

                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="uppercase font-mono text-xs tracking-widest z-[101] relative mix-blend-difference pb-0.5 border-b border-transparent hover:border-white transition-colors">
                            {mobileMenuOpen ? "Close" : "Menu"}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Fixed Bottom CTA Removed per feedback (moved to header) */}

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
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.url}
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-display text-4xl uppercase tracking-tighter"
                            >
                                {link.label}
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
