"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { StepProps, BookingData } from "@/types/booking";
import { cn } from "@/lib/utils";
import { Phone, User, Mail, Users } from "lucide-react";

const phoneRegex = /^01[0125][0-9]{8}$/;

const formSchema = z.object({
    name: z.string().min(2, "الاسم مطلوب (أكثر من حرفين)"),
    phone: z.string().regex(phoneRegex, "رقم الهاتف غير صحيح (يجب أن يبدأ بـ 01)"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    persons: z.coerce.number().min(1, "عدد الأشخاص يجب أن يكون 1 على الأقل"),
    notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UserFormStep({ onNext, onBack, updateData, data }: StepProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(formSchema) as any,
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
        onNext(formData);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
            >
                <h2 className="heading-display text-3xl md:text-4xl">بيانات الحجز</h2>
                <p className="text-muted-foreground">
                    أدخل بياناتك لتأكيد الحجز
                </p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit(onSubmit as any)}
                className="space-y-6 glass-card-elevated p-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">الاسم بالكامل</label>
                        <div className="relative">
                            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                            <input
                                {...register("name")}
                                className={cn(
                                    "input-field pr-12",
                                    errors.name && "error"
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
                                    "input-field pr-12 text-left",
                                    errors.phone && "error"
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
                                    "input-field pr-12",
                                    errors.email && "error"
                                )}
                                placeholder="example@mail.com"
                                dir="ltr"
                            />
                        </div>
                        {errors.email && <p className="text-red-400 text-xs mr-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">عدد الأشخاص</label>
                        <div className="relative">
                            <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                            <input
                                type="number"
                                {...register("persons")}
                                className="input-field pr-12"
                                placeholder="عدد الأفراد"
                            />
                        </div>
                        {errors.persons && <p className="text-red-400 text-xs mr-1">{errors.persons.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground mr-1">ملاحظات إضافية</label>
                        <textarea
                            {...register("notes")}
                            className="input-field min-h-[100px] !pr-4"
                            placeholder="هل لديك أي طلبات خاصة؟"
                        />
                    </div>
                </div>

                <div className="flex justify-between pt-8">
                    <button
                        type="button"
                        onClick={onBack}
                        className="btn-ghost px-8 py-3"
                    >
                        رجوع
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn-primary px-12 py-3 text-lg flex items-center gap-2"
                    >
                        تأكيد الحجز
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
