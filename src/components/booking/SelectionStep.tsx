"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { StepProps } from "@/types/booking";
import { cn } from "@/lib/utils";

export default function SelectionStep({ onNext, updateData, data }: StepProps) {
    const handleSelect = (type: "iftar" | "suhoor") => {
        updateData({ type });
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
            >
                <h2 className="heading-display text-3xl md:text-4xl">اختر نوع الحجز</h2>
                <p className="text-muted-foreground">
                    استمتع بأجواء رمضان المميزة معنا
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect("iftar")}
                    className={cn(
                        "relative p-8 rounded-3xl border transition-all duration-500 flex flex-col items-center gap-6 overflow-hidden group",
                        data.type === "iftar"
                            ? "border-primary/60 glass-card-elevated"
                            : "glass-card hover:border-primary/30"
                    )}
                >
                    {/* Internal Glow */}
                    {data.type === "iftar" && <div className="absolute inset-0 bg-primary/5 blur-md" />}

                    <div className={cn(
                        "p-6 rounded-full transition-all duration-300",
                        data.type === "iftar"
                            ? "bg-primary/20 text-primary shadow-glow-sm"
                            : "bg-muted/30 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                    )}>
                        <Sun className="w-12 h-12" />
                    </div>

                    <div className="text-center space-y-2 relative z-10">
                        <h3 className={cn("text-3xl font-bold font-amiri", data.type === "iftar" ? "text-primary" : "text-foreground")}>فطار</h3>
                        <p className="text-sm text-balance text-muted-foreground">
                            وجبة إفطار شهية مع أطباق رمضانية مميزة
                        </p>
                    </div>

                    {data.type === "iftar" && (
                        <motion.div
                            layoutId="checkmark"
                            className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-glow-sm"
                        >
                            ✓
                        </motion.div>
                    )}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect("suhoor")}
                    className={cn(
                        "relative p-8 rounded-3xl border transition-all duration-500 flex flex-col items-center gap-6 overflow-hidden group",
                        data.type === "suhoor"
                            ? "border-primary/60 glass-card-elevated"
                            : "glass-card hover:border-primary/30"
                    )}
                >
                    {/* Internal Glow */}
                    {data.type === "suhoor" && <div className="absolute inset-0 bg-primary/5 blur-md" />}

                    <div className={cn(
                        "p-6 rounded-full transition-all duration-300",
                        data.type === "suhoor"
                            ? "bg-primary/20 text-primary shadow-glow-sm"
                            : "bg-muted/30 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                    )}>
                        <Moon className="w-12 h-12" />
                    </div>

                    <div className="text-center space-y-2 relative z-10">
                        <h3 className={cn("text-3xl font-bold font-amiri", data.type === "suhoor" ? "text-primary" : "text-foreground")}>سحور</h3>
                        <p className="text-sm text-balance text-muted-foreground">
                            أجواء سحور هادئة مع مشروباتنا الخاصة
                        </p>
                    </div>

                    {data.type === "suhoor" && (
                        <motion.div
                            layoutId="checkmark"
                            className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-glow-sm"
                        >
                            ✓
                        </motion.div>
                    )}
                </motion.button>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onNext}
                    disabled={!data.type}
                    className="btn-primary px-16 py-4 text-xl"
                >
                    متابعة
                </button>
            </div>
        </div>
    );
}
