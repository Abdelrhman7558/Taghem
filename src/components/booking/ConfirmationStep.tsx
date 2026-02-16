"use client";

import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, User, Phone, Mail, Users } from "lucide-react";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";
import { BookingData } from "@/types/booking";

interface ConfirmationStepProps {
    data: BookingData;
    onReset: () => void;
}

export default function ConfirmationStep({ data, onReset }: ConfirmationStepProps) {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-primary">تم الحجز بنجاح!</h2>
                <p className="text-muted-foreground">
                    شكرًا لك {data.name}، تم تأكيد حجزك في خيمة قعدة زمان
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border shadow-lg space-y-6 text-right"
            >
                <h3 className="text-xl font-bold border-b border-border pb-4">تفاصيل الحجز</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">التاريخ</p>
                            <p className="font-semibold">{data.date ? format(data.date, "EEEE d MMMM yyyy", { locale: arEG }) : "-"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">الوقت</p>
                            <p className="font-semibold">{data.time}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">الاسم</p>
                            <p className="font-semibold">{data.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                            <p className="font-semibold" dir="ltr">{data.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                            <p className="font-semibold truncate max-w-[200px]" dir="ltr">{data.email}</p>
                        </div>
                    </div>

                    {data.persons && (
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">عدد الأشخاص</p>
                                <p className="font-semibold">{data.persons}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-border mt-4">
                    <p className="text-sm text-muted-foreground text-center">
                        نوع الحجز: <span className="font-bold text-primary">{data.type === "iftar" ? "فطار" : "سحور"}</span>
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <button
                    onClick={onReset}
                    className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                >
                    العودة للرئيسية
                </button>
            </motion.div>
        </div>
    );
}
