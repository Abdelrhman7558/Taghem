"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundScene() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
            {/* Background image — the Ramadan archway scene */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <img
                    src="/ramadan-bg.jpg"
                    alt="Ramadan Background"
                    className="w-full h-full object-cover object-center"
                    style={{ minHeight: "100vh" }}
                />
                {/* Subtle dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
            </motion.div>
        </div>
    );
}
