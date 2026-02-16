"use client";

import { BookingData } from "@/types/booking";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Users, Phone, RotateCcw, Mail, User } from "lucide-react";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";

interface ConfirmationStepProps {
    data: BookingData;
    onReset: () => void;
}

export default function ConfirmationStep({ data, onReset }: ConfirmationStepProps) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card/30 backdrop-blur-md p-8 rounded-3xl border border-primary/20 shadow-[0_0_30px_rgba(245,166,35,0.1)] text-center max-w-2xl mx-auto"
            >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h2 className="text-3xl font-bold mb-2 text-primary">تم الحجز بنجاح!</h2>
                <p className="text-muted-foreground mb-8 text-lg">شكراً لك، {data.name}. تم تسجيل حجزك بنجاح.</p>

                <h3 className="text-xl font-bold border-b border-white/10 pb-4 mb-6 text-foreground/80">تفاصيل الحجز</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">التاريخ</p>
                            <p className="font-bold text-lg">{data.date ? format(data.date, "EEEE d MMMM yyyy", { locale: arEG }) : "-"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">الوقت</p>
                            <p className="font-bold text-lg">{data.time}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">الأشخاص</p>
                            <p className="font-bold text-lg">{data.persons || 1}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">الهاتف</p>
                            <p className="font-bold text-lg" dir="ltr">{data.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-8">
                    <p className="text-muted-foreground">
                        نوع الحجز: <span className="font-bold text-primary text-xl mr-2">{data.type === "iftar" ? "فطار" : "سحور"}</span>
                    </p>
                </div>
            </motion.div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="px-8 py-3 rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors flex items-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    حجز جديد
                </button>
            </div>
        </div>
    );
}
