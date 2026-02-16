import { createClient } from "@supabase/supabase-js";
import BookingsTable from "@/components/admin/BookingsTable";

// Disable caching for admin data
export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: bookings, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Error loading bookings: {error.message}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8 font-cairo" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-center border-b pb-6">
                    <h1 className="text-3xl font-bold text-primary">لوحة التحكم</h1>
                    <div className="text-sm text-muted-foreground">
                        bookings: {bookings?.length || 0}
                    </div>
                </header>

                <BookingsTable bookings={bookings || []} />
            </div>
        </div>
    );
}
