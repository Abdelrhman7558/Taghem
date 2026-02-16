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
                {/* Date Picker */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-lg flex flex-col items-center"
                >
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <Calendar className="w-6 h-6" />
                        <h3 className="text-xl font-bold">التاريخ</h3>
                    </div>
                    <div className="rdp-root custom-calendar">
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
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                day_today: "bg-accent text-accent-foreground",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Time Picker */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-lg"
                >
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <Clock className="w-6 h-6" />
                        <h3 className="text-xl font-bold">الوقت</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {slots.map((slot) => (
                            <button
                                key={slot}
                                onClick={() => handleTimeSelect(slot)}
                                className={cn(
                                    "py-2 px-4 rounded-lg border transition-all text-sm font-semibold",
                                    time === slot
                                        ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-105"
                                        : "bg-background border-input hover:border-primary/50 hover:bg-accent/50"
                                )}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-between pt-8">
                <button
                    onClick={onBack}
                    className="px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                    رجوع
                </button>
                <button
                    onClick={onNext}
                    disabled={!date || !time}
                    className="px-12 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    متابعة
                </button>
            </div>
        </div>
    );
}
