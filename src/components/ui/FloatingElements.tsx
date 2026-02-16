"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── Inline SVG icons (Ramadan themed) ─── */

const LanternIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 64 80" fill="none" className={className}>
        {/* Hanging hook */}
        <path d="M32 0 C32 0 30 4 30 6 L34 6 C34 4 32 0 32 0Z" fill="currentColor" opacity="0.6" />
        <line x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        {/* Top cap */}
        <path d="M24 14 L40 14 L38 18 L26 18 Z" fill="currentColor" opacity="0.7" />
        {/* Lantern body */}
        <path d="M26 18 C22 28 22 42 26 52 L38 52 C42 42 42 28 38 18 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        {/* Inner glow */}
        <ellipse cx="32" cy="35" rx="6" ry="12" fill="currentColor" opacity="0.2" />
        {/* Bottom cap */}
        <path d="M26 52 L38 52 L40 56 L24 56 Z" fill="currentColor" opacity="0.7" />
        {/* Bottom finial */}
        <path d="M30 56 L34 56 L32 62 Z" fill="currentColor" opacity="0.5" />
        {/* Decorative bands */}
        <line x1="26" y1="30" x2="38" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="26" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
);

const CrescentIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M36 24C36 30.627 30.627 36 24 36C20.5 36 17.5 34.5 15.5 32C18.5 33 22 32.5 25 30C28 27.5 30 23.5 29.5 19C29.2 16 28 13.5 26 12C30 12.5 33 14.5 35 17.5C35.7 19.5 36 21.7 36 24Z" fill="currentColor" opacity="0.25" />
        <path d="M36 24C36 30.627 30.627 36 24 36C20.5 36 17.5 34.5 15.5 32C18.5 33 22 32.5 25 30C28 27.5 30 23.5 29.5 19C29.2 16 28 13.5 26 12C30 12.5 33 14.5 35 17.5C35.7 19.5 36 21.7 36 24Z" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
    </svg>
);

const StarIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
        <path d="M16 2 L18.5 11.5 L28 12 L20.5 18 L23 28 L16 22 L9 28 L11.5 18 L4 12 L13.5 11.5 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" />
    </svg>
);

const MosqueIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 80 60" fill="none" className={className}>
        {/* Main dome */}
        <path d="M25 35 Q40 8 55 35" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" fill="currentColor" fillOpacity="0.08" />
        {/* Base */}
        <rect x="22" y="35" width="36" height="20" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" />
        {/* Door */}
        <path d="M35 55 L35 42 Q40 38 45 42 L45 55" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" fill="currentColor" fillOpacity="0.05" />
        {/* Left minaret */}
        <rect x="12" y="20" width="6" height="35" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
        <path d="M12 20 Q15 12 18 20" fill="currentColor" opacity="0.1" />
        {/* Right minaret */}
        <rect x="62" y="20" width="6" height="35" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
        <path d="M62 20 Q65 12 68 20" fill="currentColor" opacity="0.1" />
        {/* Crescent on dome */}
        <circle cx="40" cy="12" r="2" fill="currentColor" opacity="0.3" />
    </svg>
);

const DatesIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 40 48" fill="none" className={className}>
        {/* Bowl */}
        <path d="M5 24 Q5 42 20 44 Q35 42 35 24 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Dates */}
        <ellipse cx="14" cy="26" rx="4" ry="3" fill="currentColor" opacity="0.2" />
        <ellipse cx="22" cy="24" rx="4" ry="3" fill="currentColor" opacity="0.25" />
        <ellipse cx="18" cy="30" rx="4" ry="3" fill="currentColor" opacity="0.15" />
        <ellipse cx="26" cy="28" rx="3" ry="2.5" fill="currentColor" opacity="0.2" />
    </svg>
);

/* ─── Cannon SVG with animation ─── */

const CannonSVG = () => {
    const [fired, setFired] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        // Fire cannon after 2 seconds
        const fireTimer = setTimeout(() => setFired(true), 2000);
        // Show message after cannon fires
        const msgTimer = setTimeout(() => setShowMessage(true), 2600);
        return () => {
            clearTimeout(fireTimer);
            clearTimeout(msgTimer);
        };
    }, []);

    return (
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex flex-col items-end gap-2">
            {/* Message bubble that appears after cannon fires */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative"
                    >
                        {/* Smoke puffs */}
                        <motion.div
                            initial={{ opacity: 0.6, scale: 0.3 }}
                            animate={{ opacity: 0, scale: 2, y: -40 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[rgba(158,170,184,0.3)] blur-md"
                        />
                        <div className="bg-gradient-to-r from-primary/90 to-[#E8B84A]/90 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-2xl rounded-br-sm shadow-glow-md font-bold text-lg font-amiri border border-primary/40">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                🌙 احجز الآن!
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cannon */}
            <motion.div
                animate={fired ? { rotate: [0, -15, -5, 0] } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
            >
                <svg width="100" height="70" viewBox="0 0 120 80" fill="none">
                    {/* Wheels */}
                    <circle cx="45" cy="65" r="12" stroke="#B07D3A" strokeWidth="2.5" fill="#3D2E18" />
                    <circle cx="45" cy="65" r="3" fill="#B07D3A" opacity="0.6" />
                    {/* Spokes */}
                    <line x1="45" y1="53" x2="45" y2="77" stroke="#B07D3A" strokeWidth="1" opacity="0.4" />
                    <line x1="33" y1="65" x2="57" y2="65" stroke="#B07D3A" strokeWidth="1" opacity="0.4" />
                    <line x1="36.5" y1="56.5" x2="53.5" y2="73.5" stroke="#B07D3A" strokeWidth="1" opacity="0.4" />
                    <line x1="53.5" y1="56.5" x2="36.5" y2="73.5" stroke="#B07D3A" strokeWidth="1" opacity="0.4" />

                    {/* Cannon carriage */}
                    <path d="M25 55 L70 55 L65 65 L20 65 Z" fill="#3D2E18" stroke="#B07D3A" strokeWidth="1.5" />

                    {/* Cannon barrel */}
                    <path d="M50 50 L100 30 L105 25 L108 28 L103 35 L55 55 Z"
                        fill="url(#cannonGrad)" stroke="#B07D3A" strokeWidth="1.5" />

                    {/* Barrel rings */}
                    <ellipse cx="70" cy="42" rx="5" ry="7" stroke="#D4952B" strokeWidth="1" fill="none" transform="rotate(-25, 70, 42)" />
                    <ellipse cx="85" cy="35" rx="4" ry="6" stroke="#D4952B" strokeWidth="1" fill="none" transform="rotate(-25, 85, 35)" />

                    {/* Barrel opening */}
                    <ellipse cx="106" cy="26.5" rx="3.5" ry="4.5" fill="#0B1A2A" stroke="#B07D3A" strokeWidth="1" transform="rotate(-25, 106, 26.5)" />

                    {/* Fuse */}
                    <path d="M55 48 Q58 44 56 40 Q53 36 56 33" stroke="#D4952B" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />

                    {/* Decorative crescent on barrel */}
                    <path d="M75 38 Q78 35 75 32 Q72 35 75 38" fill="#D4952B" opacity="0.7" />

                    <defs>
                        <linearGradient id="cannonGrad" x1="50" y1="50" x2="105" y2="28">
                            <stop offset="0%" stopColor="#3D2E18" />
                            <stop offset="50%" stopColor="#5A4530" />
                            <stop offset="100%" stopColor="#4A3825" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Muzzle flash */}
                <AnimatePresence>
                    {fired && (
                        <motion.div
                            initial={{ opacity: 1, scale: 0.3 }}
                            animate={{ opacity: 0, scale: 2.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute -top-3 right-0 w-10 h-10 bg-[radial-gradient(circle,rgba(212,149,43,0.8)_0%,rgba(245,180,60,0.4)_40%,transparent_70%)] rounded-full blur-sm"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

/* ─── Floating icon config ─── */

interface FloatingIcon {
    Icon: React.FC<{ className?: string }>;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    rotate: number;
}

const ICON_CONFIG: FloatingIcon[] = [
    // Lanterns
    { Icon: LanternIcon, x: 8, y: 10, size: 38, duration: 10, delay: 0, rotate: -5 },
    { Icon: LanternIcon, x: 88, y: 15, size: 32, duration: 12, delay: 2, rotate: 5 },
    { Icon: LanternIcon, x: 45, y: 5, size: 28, duration: 14, delay: 1.5, rotate: -3 },
    // Crescents
    { Icon: CrescentIcon, x: 75, y: 40, size: 30, duration: 16, delay: 3, rotate: 10 },
    { Icon: CrescentIcon, x: 15, y: 55, size: 24, duration: 13, delay: 1, rotate: -15 },
    { Icon: CrescentIcon, x: 55, y: 75, size: 20, duration: 11, delay: 4, rotate: 8 },
    // Stars
    { Icon: StarIcon, x: 20, y: 25, size: 18, duration: 8, delay: 0.5, rotate: 0 },
    { Icon: StarIcon, x: 70, y: 20, size: 14, duration: 9, delay: 2.5, rotate: 15 },
    { Icon: StarIcon, x: 35, y: 65, size: 16, duration: 10, delay: 3.5, rotate: -10 },
    { Icon: StarIcon, x: 85, y: 60, size: 12, duration: 7, delay: 1, rotate: 20 },
    { Icon: StarIcon, x: 50, y: 40, size: 10, duration: 11, delay: 0, rotate: -5 },
    // Mosque
    { Icon: MosqueIcon, x: 5, y: 78, size: 60, duration: 20, delay: 0, rotate: 0 },
    { Icon: MosqueIcon, x: 82, y: 82, size: 50, duration: 22, delay: 2, rotate: 0 },
    // Dates bowl
    { Icon: DatesIcon, x: 30, y: 85, size: 28, duration: 15, delay: 4, rotate: 5 },
];

export default function FloatingElements() {
    const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number; size: number }>>([]);

    useEffect(() => {
        const newParticles = [...Array(25)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 12 + 8,
            delay: Math.random() * 5,
            size: Math.random() * 3 + 1,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {/* 1. Professional gradient background — deep midnight to twilight */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060E1A] via-[#0B1A2A] to-[#0A1525]" />

            {/* 2. Subtle radial warm center from top (like moonlight) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(212,149,43,0.06)_0%,transparent_60%)]" />

            {/* 3. Islamic geometric pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(212,149,43,0.15) 59px, rgba(212,149,43,0.15) 60px),
                        repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(212,149,43,0.15) 59px, rgba(212,149,43,0.15) 60px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* 4. Diamond pattern overlay (tessellation feel) */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(45deg, transparent, transparent 42px, rgba(212,149,43,0.12) 42px, rgba(212,149,43,0.12) 43px),
                        repeating-linear-gradient(-45deg, transparent, transparent 42px, rgba(212,149,43,0.12) 42px, rgba(212,149,43,0.12) 43px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* 5. Warm lantern glow — pulsing center radial */}
            <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(212,149,43,0.08)_0%,rgba(176,125,58,0.04)_35%,transparent_65%)] blur-3xl"
            />

            {/* 6. Secondary glow — bottom warm */}
            <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(139,94,43,0.08)_0%,transparent_70%)] blur-2xl"
            />

            {/* 7. Mystical horizontal smoke drift */}
            <motion.div
                animate={{ opacity: [0.04, 0.1, 0.04], x: [-20, 20, -20] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/3 w-full h-1/3 bg-gradient-to-b from-transparent via-[rgba(158,170,184,0.03)] to-transparent"
            />

            {/* 8. Floating Ramadan SVG icons */}
            {ICON_CONFIG.map((item, i) => (
                <motion.div
                    key={`icon-${i}`}
                    className="absolute text-primary"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        width: item.size,
                        height: item.size,
                    }}
                    initial={{ opacity: 0, rotate: item.rotate }}
                    animate={{
                        opacity: [0, 0.6, 0.4, 0.6, 0],
                        y: [0, -15, -5, -20, 0],
                        rotate: [item.rotate, item.rotate + 3, item.rotate - 3, item.rotate],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut",
                    }}
                >
                    <item.Icon className="w-full h-full" />
                </motion.div>
            ))}

            {/* 9. Gold dust particles (smaller, more subtle) */}
            {particles.map((p, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        background: i % 3 === 0
                            ? '#D4952B'
                            : i % 3 === 1
                                ? '#B07D3A'
                                : '#FAF0E0',
                        boxShadow: `0 0 ${p.size * 3}px ${i % 3 === 0 ? 'rgba(212,149,43,0.4)' : 'rgba(176,125,58,0.3)'}`,
                    }}
                    initial={{
                        x: p.x + "%",
                        y: p.y + "%",
                        opacity: 0,
                    }}
                    animate={{
                        y: [null, p.y - 20 + "%"],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* 10. Vignette overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,14,26,0.6)_100%)]" />

            {/* 11. Animated Ramadan Cannon — bottom right */}
            <div className="pointer-events-auto">
                <CannonSVG />
            </div>
        </div>
    );
}
