"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingElements() {
    const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number; size: number }>>([]);

    useEffect(() => {
        const newParticles = [...Array(30)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            size: Math.random() * 3 + 1,
        }));
        setParticles(newParticles);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* 1. Deep Atmospheric Glow (Base) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#132029] via-[#0D161C] to-[#0A1115] -z-30" />

            {/* 2. Warm center light glow (representing the lantern light source) */}
            <motion.div
                animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(245,166,35,0.15)_0%,transparent_70%)] blur-3xl -z-20"
            />

            {/* 3. Mystical Smoke Swirls */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], x: [-20, 20, -20] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-[#132029] via-transparent to-transparent -z-10"
            />

            {/* 4. Floating 'Dust Motes' (Fireflies/Magic) */}
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-[#F5A623] shadow-[0_0_10px_#F5A623]"
                    style={{ width: p.size, height: p.size }}
                    initial={{
                        x: p.x + "%",
                        y: p.y + "%",
                        opacity: 0,
                    }}
                    animate={{
                        y: [null, p.y - 20 + "%"], // float upwards
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
