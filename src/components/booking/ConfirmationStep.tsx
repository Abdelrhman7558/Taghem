"use client";

import { BookingData } from "@/types/booking";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Users, Phone, RotateCcw } from "lucide-react";
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
                className="glass-card-elevated p-8 border-primary/20 text-center max-w-2xl mx-auto"
            >
                {/* Success icon — golden themed */}
                <div className="w-20 h-20 bg-primary/15 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-sm">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h2 className="heading-display text-3xl mb-2">تم الحجز بنجاح!</h2>
                <p className="text-muted-foreground mb-8 text-lg">شكراً لك، {data.name}. تم تسجيل حجزك بنجاح.</p>

                {/* Golden divider */}
                <div className="flex items-center gap-3 justify-center mb-6">
                    <div className="h-px w-16 bg-gradient-to-l from-primary/50 to-transparent" />
                    <h3 className="text-xl font-bold font-amiri text-primary">تفاصيل الحجز</h3>
                    <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/15 border border-border/40">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">التاريخ</p>
                            <p className="font-bold text-lg">{data.date ? format(data.date, "EEEE d MMMM yyyy", { locale: arEG }) : "-"}</p>
                        </div>
                    </div>



                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/15 border border-border/40">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">الأشخاص</p>
                            <p className="font-bold text-lg">{data.persons || 1}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/15 border border-border/40">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">الهاتف</p>
                            <p className="font-bold text-lg" dir="ltr">{data.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Booking type */}
                <div className="pt-6 border-t border-border/30 mt-6">
                    <p className="text-muted-foreground">
                        نوع الحجز: <span className="font-bold font-amiri text-primary text-xl mr-2">{data.type === "iftar" ? "فطار" : "سحور"}</span>
                    </p>
                </div>
            </motion.div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="btn-ghost px-8 py-3 flex items-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    حجز جديد
                </button>
            </div>
        </div>
    );
}
