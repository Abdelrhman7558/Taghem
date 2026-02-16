"use server";

import { BookingData } from "@/types/booking";

export async function submitBooking(data: BookingData) {
    try {
        // 1. Validate data (simple check)
        if (!data.type || !data.date || !data.name || !data.phone || !data.email || !data.persons || data.persons < 1) {
            return { success: false, error: "Missing required fields" };
        }

        // 2. Generate unique Order ID
        // Format: #ORD-{Random 6 digits}
        const orderId = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;

        // 3. Trigger Webhook (n8n)
        // We want to fail if the webhook fails, or at least log it deeply.
        // Since we removed Supabase, this is the ONLY source of truth.
        const webhookUrl = "https://n8n.srv1181726.hstgr.cloud/webhook/booked";

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                orderId,
                date: data.date, // Sending date object, can be formatted by receiver or here if needed
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error(`Webhook failed with status ${response.status}`);
        }

        // Return success and the generated orderId
        return { success: true, orderId };

    } catch (error) {
        console.error("Server action error:", error);
        return { success: false, error: "Internal server error" };
    }
}
