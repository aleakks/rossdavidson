"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageProtection() {
    const [toast, setToast] = useState<{ show: boolean; x: number; y: number } | null>(null);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Check if the clicked target is an image, contains an image, 
            // or is a relative/aspect container wrapping an image
            const isImage = target.tagName === "IMG" || target.closest("img");
            const containsImage = target.querySelector("img") !== null;
            const parentHasImage = target.closest(".relative")?.querySelector("img") !== null;
            
            if (isImage || containsImage || parentHasImage) {
                e.preventDefault();
                
                // Show dynamic copyright toast at cursor position
                setToast({
                    show: true,
                    x: e.clientX,
                    y: e.clientY
                });
            }
        };

        window.addEventListener("contextmenu", handleContextMenu);
        return () => window.removeEventListener("contextmenu", handleContextMenu);
    }, []);

    // Auto-hide toast after 2 seconds
    useEffect(() => {
        if (toast?.show) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <AnimatePresence>
            {toast?.show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        left: toast.x,
                        top: toast.y,
                        transform: "translate(-50%, -120%)",
                        zIndex: 999999,
                        pointerEvents: "none"
                    }}
                    className="bg-black/95 text-white font-mono text-[10px] uppercase tracking-widest px-4 py-2.5 border border-white/20 rounded shadow-2xl backdrop-blur-md select-none whitespace-nowrap"
                >
                    © Ross Davidson • All Rights Reserved
                </motion.div>
            )}
        </AnimatePresence>
    );
}
