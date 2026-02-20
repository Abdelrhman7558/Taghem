"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MENU_IMAGES = [
    { src: "/menu-cover.png", alt: "خيمة قعدة زمان" },
    { src: "/menu-1.png", alt: "قائمة طعام ١ - 800 جنيه" },
    { src: "/menu-2.png", alt: "قائمة طعام ٢ - 1000 جنيه" },
    { src: "/menu-3.png", alt: "قائمة طعام ٣ - 1250 جنيه" },
    { src: "/menu-4.png", alt: "قائمة طعام ٤ - ١٥٠٠ جنية" },
    { src: "/menu-trays.png", alt: "صواني" },
    { src: "/menu-misc.png", alt: "أطباق متنوعة" },
    { src: "/menu-end.png", alt: "نتمنى ان تكون قائمتنا نالت رضاكم" },
];

export default function MenuCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (dir: number) => {
        setDirection(dir);
        setCurrentIndex((prev) => {
            const next = prev + dir;
            if (next < 0) return MENU_IMAGES.length - 1;
            if (next >= MENU_IMAGES.length) return 0;
            return next;
        });
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.9,
        }),
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card-elevated p-6 rounded-3xl"
        >
            <h3 className="text-xl font-bold font-amiri text-primary text-center mb-4">
                🍽️ قوائم الطعام
            </h3>

            {/* Carousel */}
            <div className="relative overflow-hidden rounded-2xl bg-black/20" style={{ aspectRatio: "3/4" }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={MENU_IMAGES[currentIndex].src}
                        alt={MENU_IMAGES[currentIndex].alt}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
                        draggable={false}
                    />
                </AnimatePresence>

                {/* Navigation arrows */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors border border-white/10"
                    aria-label="السابق"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors border border-white/10"
                    aria-label="التالي"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
                {MENU_IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                        className={`rounded-full transition-all duration-300 ${i === currentIndex
                            ? "w-6 h-2 bg-primary shadow-glow-sm"
                            : "w-2 h-2 bg-border hover:bg-primary/40"
                            }`}
                        aria-label={`صفحة ${i + 1}`}
                    />
                ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-3">
                اسحب أو اضغط الأسهم لتصفح القوائم
            </p>
        </motion.div>
    );
}
