"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookingData } from "@/types/booking";
import SelectionStep from "./SelectionStep";
import DateTimeStep from "./DateTimeStep";
import UserFormStep from "./UserFormStep";
import ConfirmationStep from "./ConfirmationStep";
import { submitBooking } from "@/actions/booking";

export default function StepWizard() {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({ persons: 1 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateData = (newData: Partial<BookingData>) => {
        setBookingData((prev) => ({ ...prev, ...newData }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleFinalSubmit = async (finalFormData?: Partial<BookingData>) => {
        setIsSubmitting(true);
        const dataToSubmit = { ...bookingData, ...finalFormData };
        try {
            const result = await submitBooking(dataToSubmit as BookingData);
            if (result.success && result.orderId) {
                updateData({ ...finalFormData, orderId: result.orderId });
                setStep(4); // Go to confirmation
            } else {
                alert("حدث خطأ أثناء الحجز: " + result.error);
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("حدث خطأ غير متوقع");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setStep(1);
        setBookingData({ persons: 1 });
    };

    return (
        <div className="min-h-screen py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Progress Indicator — glowing golden dots */}
                <div className="mb-12 flex justify-center gap-3" dir="ltr">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center gap-3">
                            <div
                                className={`rounded-full transition-all duration-500 ${s <= step
                                    ? "w-3 h-3 bg-primary shadow-glow-sm"
                                    : "w-2 h-2 bg-border"
                                    }`}
                            />
                            {s < 4 && (
                                <div
                                    className={`h-px transition-all duration-500 ${s < step ? "w-8 bg-primary/50" : "w-8 bg-border/30"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {isSubmitting ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-foreground"
                        >
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6 shadow-glow-md" />
                            <p className="text-xl font-bold font-amiri text-primary">جاري تأكيد الحجز...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={step}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            {step === 1 && (
                                <SelectionStep
                                    onNext={nextStep}
                                    onBack={prevStep}
                                    updateData={updateData}
                                    data={bookingData}
                                />
                            )}
                            {step === 2 && (
                                <DateTimeStep
                                    onNext={nextStep}
                                    onBack={prevStep}
                                    updateData={updateData}
                                    data={bookingData}
                                />
                            )}
                            {step === 3 && (
                                <UserFormStep
                                    onNext={handleFinalSubmit}
                                    onBack={prevStep}
                                    updateData={updateData}
                                    data={bookingData}
                                />
                            )}
                            {step === 4 && (
                                <ConfirmationStep
                                    data={bookingData}
                                    onReset={handleReset}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
