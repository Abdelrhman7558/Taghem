"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { StepProps, BookingData } from "@/types/booking"; // Modified: Added BookingData
import { cn } from "@/lib/utils";
import { Phone, User, Mail, Users } from "lucide-react"; // Added: Lucide icons

const phoneRegex = /^01[0125][0-9]{8}$/;

const formSchema = z.object({
    name: z.string().min(2, "الاسم مطلوب (أكثر من حرفين)"),
    phone: z.string().regex(phoneRegex, "رقم الهاتف غير صحيح (يجب أن يبدأ بـ 01)"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    persons: z.coerce.number().min(1, "عدد الأشخاص يجب أن يكون 1 على الأقل").optional(),
    notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UserFormStep({ onNext, onBack, updateData, data }: StepProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            persons: data.persons || 1,
            notes: data.notes || "",
        },
        mode: "onChange",
    });

    const onSubmit = (formData: FormData) => {
        updateData(formData);
        onNext();
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <h2 className="text-3xl font-bold text-primary">بيانات الحجز</h2>
                <p className="text-muted-foreground">
                    أدخل بياناتك لتأكيد الحجز
                </p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border shadow-lg"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">الاسم بالكامل</label>
                        <div className="relative">
                            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                            <input
                                {...register("name")}
                                className={cn(
                                    "w-full pr-12 pl-4 py-4 rounded-xl bg-white/5 border outline-none transition-all focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/30",
                                    errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50 hover:border-white/20"
                                )}
                                placeholder="ادخل اسمك ثلاثي"
                            />
                        </div>
                        {errors.name && <p className="text-red-400 text-xs mr-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">رقم الهاتف</label>
                        <div className="relative">
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                            <input
                                {...register("phone")}
                                className={cn(
                                    "w-full pr-12 pl-4 py-4 rounded-xl bg-white/5 border outline-none transition-all focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/30 text-left",
                                    errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50 hover:border-white/20"
                                )}
                                placeholder="01xxxxxxxxx"
                                dir="ltr"
                            />
                        </div>
                        {errors.phone && <p className="text-red-400 text-xs mr-1">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">البريد الإلكتروني</label>
                        <div className="relative">
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                            <input
                                {...register("email")}
                                className={cn(
                                    "w-full pr-12 pl-4 py-4 rounded-xl bg-white/5 border outline-none transition-all focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/30",
                                    errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50 hover:border-white/20"
                                )}
                                placeholder="example@mail.com"
                                dir="ltr"
                            />
                        </div>
                        {errors.email && <p className="text-red-400 text-xs mr-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">عدد الأشخاص (اختياري)</label>
                        <div className="relative">
                            <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                            <input
                                type="number"
                                {...register("persons")}
                                className="w-full pr-12 pl-4 py-4 rounded-xl bg-white/5 border border-white/10 outline-none transition-all focus:ring-1 focus:ring-primary/50 focus:border-primary/50 hover:border-white/20 text-foreground placeholder:text-muted-foreground/30"
                                placeholder="عدد الأفراد"
                            />
                        </div>
                        {errors.persons && <p className="text-red-400 text-xs mr-1">{errors.persons.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">ملاحظات إضافية</label>
                        <textarea // Changed from input to textarea for notes
                            {...register("notes")}
                            className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 outline-none transition-all focus:ring-1 focus:ring-primary/50 focus:border-primary/50 hover:border-white/20 text-foreground placeholder:text-muted-foreground/30 min-h-[100px]" // Added min-h for textarea
                            placeholder="هل لديك أي طلبات خاصة؟"
                        />
                    </div>
                </div>

                <div className="flex justify-between pt-8">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-8 py-3 rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                    >
                        رجوع
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="px-12 py-3 bg-primary text-primary-foreground text-lg font-bold rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(245,166,35,0.4)] hover:shadow-[0_0_30px_rgba(245,166,35,0.6)] hover:-translate-y-1 flex items-center gap-2"
                    >
                        تأكيد الحجز
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
