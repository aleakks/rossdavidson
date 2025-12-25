"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Hide cursor on mobile/touch devices
        const checkMobile = () => {
            if (window.matchMedia("(pointer: coarse)").matches) {
                return true;
            }
            return false;
        };

        if (checkMobile()) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).closest(".hover-target")) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Don't render on server or if mobile (render logic handled via CSS mostly, but this saves resources)
    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block" // Hidden explicitly on mobile via CSS class as a fail-safe
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <motion.div
                animate={{
                    width: isHovered ? 80 : 20,
                    height: isHovered ? 80 : 20,
                    backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 1)",
                    border: isHovered ? "1px solid rgba(255, 255, 255, 0.5)" : "0px solid rgba(255, 255, 255, 0)",
                    mixBlendMode: isHovered ? "normal" : "difference",
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
                className="rounded-full flex items-center justify-center bg-white"
            />
        </motion.div>
    );
}
