"use client";


import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";


import { useRouter } from "next/navigation";

interface HeaderProps {
    links: { label: string; url: string; }[];
}

export default function Header({ links: passedLinks }: HeaderProps) {
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Restore standard Next.js conditional links for SEO/Accessibility
    // CRITICAL FIX: explicit /#hash when not on home to trigger navigation
    const rawLinksWithDefaults = passedLinks?.length > 0 ? passedLinks : [
        { label: "Home", url: "/" },
        { label: "Live", url: "/live" },
        { label: "Publications", url: "/publications" },
        { label: "Contact", url: "/contact" },
        { label: "About", url: "/#about" },
    ];

    // Dynamically swap Contact and About if they exist in the wrong order
    const rawLinks = [...rawLinksWithDefaults];
    const contactIndex = rawLinks.findIndex(l => l.label.toLowerCase() === 'contact');
    const aboutIndex = rawLinks.findIndex(l => l.label.toLowerCase() === 'about');
    if (contactIndex !== -1 && aboutIndex !== -1 && aboutIndex < contactIndex) {
        const temp = rawLinks[contactIndex];
        rawLinks[contactIndex] = rawLinks[aboutIndex];
        rawLinks[aboutIndex] = temp;
    }

    // TRANSFORM LINKS: Ensure hash links are absolute (/#hash) when not on home page
    const navLinks = rawLinks.map(link => ({
        ...link,
        url: (!isHome && link.url.startsWith("#")) ? `/${link.url}` : link.url
    }));

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        // We only need to intercept if we are ON the home page and clicking a hash link
        // OR if we want to smooth scroll.
        // For cross-page (e.g. /journal -> /#about), standard Next.js <Link> behavior
        // usually works, but if it's failing, we can force it.

        setMobileMenuOpen(false); // Always close menu

        const isHash = url.startsWith("#");
        const isCrossPageHash = url.startsWith("/#");

        if (isHash) {
            e.preventDefault();
            const targetId = url.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", url);
            }
        }
        else if (isCrossPageHash) {
            // e.g. /#about
            if (isHome) {
                // If we are already on home, treat it as local scroll
                e.preventDefault();
                const hash = url.replace("/", "");
                const targetId = hash.replace("#", "");
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", hash);
                }
            }
            // If not home, let standard Link behavior happen (navigate to /#about)
            // But user says it fails. So let's try router.push
            else {
                // e.preventDefault(); // Optional: try default first?
                // router.push(url);
            }
        }
    };




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
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.url}
                                onClick={(e) => handleNavClick(e, link.url)}
                                className="font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Header: Menu Button */}
                    <div className="md:hidden pointer-events-auto w-full flex justify-end gap-4 items-center">
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
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.url}
                                onClick={(e) => handleNavClick(e, link.url)}
                                className="font-display text-4xl uppercase tracking-tighter"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
