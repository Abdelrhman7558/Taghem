"use server";

import { BookingData } from "@/types/booking";
import { createClient } from "@supabase/supabase-js"; // Use direct client for server actions or createServerClient if using auth
// For simplicity in this public form, we can use the admin key or just anon key if RLS allows insert.
// Better to use service role key for admin tasks if needed, but for public booking, anon key with RLS is fine.
// actually, I'll use the standard client I just created? No, server actions should essentially be server-side.
// I'll use the env vars directly here to create a client on the fly or duplicate the util. 
// Ideally user `createClient` from `@supabase/supabase-js`

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// If we had a service role key we would use it for bypassing RLS, but let's assume public insert is allowed for now
// or we will use the anon key.

const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitBooking(data: BookingData) {
    try {
        // 1. Validate data (simple check)
        if (!data.type || !data.date || !data.name || !data.phone || !data.email) {
            return { success: false, error: "Missing required fields" };
        }

        // 2. Insert into Supabase
        const { error } = await supabase.from("bookings").insert([
            {
                type: data.type,
                date: data.date,
                name: data.name,
                phone: data.phone,
                email: data.email,
                persons: data.persons,
                notes: data.notes,
                created_at: new Date().toISOString(),
            },
        ]);

        if (error) {
            console.error("Supabase error:", error);
            throw new Error("Failed to save booking");
        }

        // 3. Trigger Webhook (n8n)
        try {
            await fetch("https://n8n.srv1181726.hstgr.cloud/webhook-test/booked", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    date: data.date, // format if needed
                    timestamp: new Date().toISOString(),
                }),
            });
        } catch (webhookError) {
            console.error("Webhook error:", webhookError);
            // Don't fail the booking if webhook fails, just log it.
        }

        return { success: true };
    } catch (error) {
        console.error("Server action error:", error);
        return { success: false, error: "Internal server error" };
    }
}
