export type BookingType = "iftar" | "suhoor";

export interface BookingData {
    type?: BookingType;
    date?: Date;
    name?: string;
    phone?: string;
    email?: string;
    persons: number;
    notes?: string;
    orderId?: string;
}

export interface StepProps {
    onNext: (data?: any) => void;
    onBack: () => void;
    updateData: (data: Partial<BookingData>) => void;
    data: BookingData;
}
