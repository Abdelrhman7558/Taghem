"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import { StepProps } from "@/types/booking";
import "react-day-picker/dist/style.css";
import { arEG } from "date-fns/locale";
import { startOfDay } from "date-fns";
import MenuCarousel from "./MenuCarousel";

export default function DateTimeStep({ onNext, onBack, updateData, data }: StepProps) {
    const [date, setDate] = useState<Date | undefined>(data.date);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        updateData({ date: selectedDate });
    };

    const showMenu = data.type === "iftar";

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
            >
                <h2 className="heading-display text-3xl md:text-4xl">اختر التاريخ</h2>
                <p className="text-muted-foreground">
                    متى تحب تشرفنا؟
                </p>
            </motion.div>

            {/* Main content: Calendar + Menu (side by side on desktop) */}
            <div className={`grid gap-6 ${showMenu ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-2xl mx-auto"}`}>
                {/* Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card-elevated p-6 max-w-md mx-auto w-full"
                >
                    <div className="flex items-center gap-3 mb-6 text-primary border-b border-border/50 pb-4 justify-center">
                        <Calendar className="w-6 h-6" />
                        <h3 className="text-xl font-bold font-amiri">اختر التاريخ</h3>
                    </div>

                    <div className="flex justify-center">
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            disabled={[{ before: new Date(2026, 1, 23) }]}
                            locale={arEG}
                            dir="rtl"
                            showOutsideDays
                            className="p-3"
                            classNames={{
                                months: "space-y-4",
                                month: "space-y-4",
                                caption: "flex justify-center pt-1 relative items-center text-primary font-amiri",
                                caption_label: "text-lg font-bold",
                                nav: "space-x-1 flex items-center",
                                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-primary transition-opacity",
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex",
                                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                                row: "flex w-full mt-2",
                                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/15 first:[&:has([aria-selected])]:rounded-r-md last:[&:has([aria-selected])]:rounded-l-md focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-muted/40 rounded-md transition-colors text-foreground",
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-glow-sm",
                                day_today: "bg-muted/30 text-foreground border border-primary/30",
                                day_outside: "text-muted-foreground opacity-50",
                                day_disabled: "text-muted-foreground opacity-30",
                                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                day_hidden: "invisible",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Menu Carousel — only when Iftar is selected */}
                {showMenu && <MenuCarousel />}
            </div>

            <div className="flex justify-between pt-8">
                <button
                    onClick={onBack}
                    className="btn-ghost px-8 py-3"
                >
                    رجوع
                </button>
                <button
                    onClick={onNext}
                    disabled={!date}
                    className="btn-primary px-12 py-3 text-lg"
                >
                    متابعة
                </button>
            </div>
        </div>
    );
}

