"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function HashScroll() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Function to handle scrolling
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace("#", "");
                // Poll for the element
                let attempts = 0;
                const interval = setInterval(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        console.log(`[HashScroll] Found ${id}, scrolling now.`);
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                        clearInterval(interval);
                    } else {
                        console.log(`[HashScroll] Looking for ${id}... (${attempts})`);
                    }
                    attempts++;
                    if (attempts > 50) {
                        clearInterval(interval); // Give up after 5s
                        console.log(`[HashScroll] Gave up looking for ${id}`);
                    }
                }, 100);
            }
        };

        // Run on initial mount
        handleHashScroll();

        // Run on pathname change (Next.js navigation)
        // We wrap in timeout to allow React to render the new page content
        const timeoutId = setTimeout(handleHashScroll, 100);

        return () => clearTimeout(timeoutId);
    }, [pathname, searchParams]);

    return null;
}
