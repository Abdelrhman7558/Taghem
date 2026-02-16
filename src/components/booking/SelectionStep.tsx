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
                className="text-center space-y-2"
            >
                <h2 className="text-3xl font-bold text-primary">اختر نوع الحجز</h2>
                <p className="text-muted-foreground">
                    استمتع بأجواء رمضان المميزة معنا
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect("iftar")}
                    className={cn(
                        "relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 bg-card/50 backdrop-blur-sm",
                        data.type === "iftar"
                            ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(251,188,5,0.2)]"
                            : "border-border hover:border-primary/50"
                    )}
                >
                    <div className="p-4 rounded-full bg-primary/20 text-primary">
                        <Sun className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold">فطار</h3>
                    <p className="text-sm text-muted-foreground">
                        وجبة إفطار شهية مع أطباق رمضانية مميزة
                    </p>
                    {data.type === "iftar" && (
                        <motion.div
                            layoutId="checkmark"
                            className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black text-xs font-bold"
                        >
                            ✓
                        </motion.div>
                    )}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect("suhoor")}
                    className={cn(
                        "relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 bg-card/50 backdrop-blur-sm",
                        data.type === "suhoor"
                            ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(251,188,5,0.2)]"
                            : "border-border hover:border-primary/50"
                    )}
                >
                    <div className="p-4 rounded-full bg-secondary text-primary">
                        <Moon className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold">سحور</h3>
                    <p className="text-sm text-muted-foreground">
                        أجواء سحور هادئة مع مشروباتنا الخاصة
                    </p>
                    {data.type === "suhoor" && (
                        <motion.div
                            layoutId="checkmark"
                            className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black text-xs font-bold"
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
                    className="px-12 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    متابعة
                </button>
            </div>
        </div>
    );
}
