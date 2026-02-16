"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { StepProps } from "@/types/booking";
import { cn } from "@/lib/utils";

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
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">الاسم بالكامل <span className="text-red-500">*</span></label>
                        <input
                            {...register("name")}
                            className={cn(
                                "w-full p-4 rounded-xl bg-background border outline-none transition-all focus:ring-2 focus:ring-primary/50",
                                errors.name ? "border-red-500 focus:border-red-500" : "border-input focus:border-primary"
                            )}
                            placeholder="مثال: أحمد محمد"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm animate-pulse">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">رقم الهاتف <span className="text-red-500">*</span></label>
                            <input
                                {...register("phone")}
                                className={cn(
                                    "w-full p-4 rounded-xl bg-background border outline-none transition-all focus:ring-2 focus:ring-primary/50 text-left",
                                    errors.phone ? "border-red-500 focus:border-red-500" : "border-input focus:border-primary"
                                )}
                                placeholder="01xxxxxxxxx"
                                dir="ltr"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm animate-pulse">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">البريد الإلكتروني <span className="text-red-500">*</span></label>
                            <input
                                {...register("email")}
                                className={cn(
                                    "w-full p-4 rounded-xl bg-background border outline-none transition-all focus:ring-2 focus:ring-primary/50 text-left",
                                    errors.email ? "border-red-500 focus:border-red-500" : "border-input focus:border-primary"
                                )}
                                placeholder="example@mail.com"
                                dir="ltr"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm animate-pulse">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">عدد الأشخاص (اختياري)</label>
                        <input
                            type="number"
                            {...register("persons")}
                            className="w-full p-4 rounded-xl bg-background border border-input outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/50"
                            placeholder="1"
                            min="1"
                        />
                        {errors.persons && (
                            <p className="text-red-500 text-sm animate-pulse">{errors.persons.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">ملاحظات إضافية (اختياري)</label>
                        <textarea
                            {...register("notes")}
                            className="w-full p-4 rounded-xl bg-background border border-input outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                            placeholder="هل لديك أي طلبات خاصة؟"
                        />
                    </div>
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        رجوع
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="px-12 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        تأكيد الحجز
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
