"use client";


import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [hidden, setHidden] = useState(false);
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
        { name: "Approach", href: "/info" },
        { name: "About", href: isHome ? "#about" : "/#about" },
        { name: "Journal", href: "/journal" },
        { name: "Contact", href: isHome ? "#contact" : "/#contact" },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:py-6 text-white pointer-events-none backdrop-blur-md bg-black/50 border-b border-white/5"
        >
            <div className="container mx-auto flex justify-center items-center">

                {/* Nav */}
                <nav className="pointer-events-auto hidden md:flex gap-12 items-center">

                    {/* Conditional Home Link */}
                    {!isHome && (
                        <Link
                            href="/"
                            className="font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
                        >
                            Home
                        </Link>
                    )}

                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Icon (Placeholder) */}
                <div className="md:hidden pointer-events-auto">
                    <button className="uppercase font-mono text-xs tracking-widest">
                        Menu
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
