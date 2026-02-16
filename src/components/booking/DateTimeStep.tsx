"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { arEG } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { StepProps } from "@/types/booking";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css"; // Ensure this is imported or handled

// Mock time slots - in real app, fetch from backend based on date/type
const TIME_SLOTS = [
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
];

const SUHOOR_SLOTS = [
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
    "00:30",
    "01:00",
    "01:30",
];

export default function DateTimeStep({ onNext, onBack, updateData, data }: StepProps) {
    const [date, setDate] = useState<Date | undefined>(data.date);
    const [time, setTime] = useState<string | undefined>(data.time);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        updateData({ date: selectedDate });
        // Reset time if date changes? Maybe strictly not needed but good UX
    };

    const handleTimeSelect = (selectedTime: string) => {
        setTime(selectedTime);
        updateData({ time: selectedTime });
    };

    const slots = data.type === "suhoor" ? SUHOOR_SLOTS : TIME_SLOTS;

    // Custom styling for DayPicker to match theme if possible, 
    // currently relying on default + css variables wrapper

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <h2 className="text-3xl font-bold text-primary">اختر الموعد</h2>
                <p className="text-muted-foreground">
                    متى تحب تشرفنا؟
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card/30 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl"
                >
                    <div className="flex items-center gap-3 mb-6 text-primary border-b border-white/5 pb-4">
                        <Calendar className="w-6 h-6" />
                        <h3 className="text-xl font-bold">اختر التاريخ</h3>
                    </div>

                    <div className="flex justify-center">
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            disabled={[{ before: startOfDay(new Date()) }]}
                            locale={arEG}
                            dir="rtl"
                            showOutsideDays
                            className="p-3"
                            classNames={{
                                months: "space-y-4",
                                month: "space-y-4",
                                caption: "flex justify-center pt-1 relative items-center text-primary",
                                caption_label: "text-lg font-bold",
                                nav: "space-x-1 flex items-center",
                                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-primary transition-opacity",
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex",
                                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                                row: "flex w-full mt-2",
                                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/20 first:[&:has([aria-selected])]:rounded-r-md last:[&:has([aria-selected])]:rounded-l-md focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-md transition-colors text-foreground",
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-[0_0_15px_rgba(245,166,35,0.4)]",
                                day_today: "bg-white/5 text-accent-foreground border border-primary/30",
                                day_outside: "text-muted-foreground opacity-50",
                                day_disabled: "text-muted-foreground opacity-30",
                                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                day_hidden: "invisible",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Time Picker */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card/30 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl h-fit"
                >
                    <div className="flex items-center gap-3 mb-6 text-primary border-b border-white/5 pb-4">
                        <Clock className="w-6 h-6" />
                        <h3 className="text-xl font-bold">اختر الوقت</h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {slots.map((slot) => (
                            <button
                                key={slot}
                                onClick={() => handleTimeSelect(slot)}
                                className={cn(
                                    "py-3 px-4 rounded-xl border transition-all text-sm font-semibold relative overflow-hidden",
                                    time === slot
                                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(245,166,35,0.3)] transform scale-105 z-10"
                                        : "bg-white/5 border-white/5 text-muted-foreground hover:border-primary/30 hover:bg-white/10 hover:text-foreground"
                                )}
                            >
                                {time === slot && <div className="absolute inset-0 bg-white/20 blur-sm" />}
                                <span className="relative z-10">{slot}</span>
                            </button>
                        ))}
                    </div>
                    {slots.length === 0 && (
                        <div className="text-center text-muted-foreground py-10">
                            الرجاء اختيار نوع الحجز أولاً
                        </div>
                    )}
                </motion.div>
            </div>

            <div className="flex justify-between pt-8">
                <button
                    onClick={onBack}
                    className="px-8 py-3 rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                >
                    رجوع
                </button>
                <button
                    onClick={onNext}
                    disabled={!date || !time}
                    className="px-12 py-3 bg-primary text-primary-foreground text-lg font-bold rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(245,166,35,0.4)] hover:shadow-[0_0_30px_rgba(245,166,35,0.6)] hover:-translate-y-1"
                >
                    متابعة
                </button>
            </div>
        </div>
    );
}
