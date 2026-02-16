"use client";

import { useState } from "react";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";
import { Download, Search } from "lucide-react";

// Simple CSV generator
const downloadCSV = (data: any[]) => {
    const headers = ["ID", "Type", "Date", "Name", "Phone", "Email", "Persons", "Notes", "Created At"];
    const csvContent = [
        headers.join(","),
        ...data.map(row => [
            row.id,
            row.type,
            row.date,
            `"${row.name}"`,
            `"${row.phone}"`,
            row.email,
            row.persons,
            `"${row.notes || ''}"`,
            row.created_at
        ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function BookingsTable({ bookings }: { bookings: any[] }) {
    const [filter, setFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.name.toLowerCase().includes(filter.toLowerCase()) ||
            booking.phone.includes(filter) ||
            booking.email.toLowerCase().includes(filter.toLowerCase());
        const matchesType = typeFilter === "all" || booking.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Filters bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center glass-card p-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        className="input-field pr-10 !py-2 !rounded-lg"
                        placeholder="بحث بالاسم، الهاتف، أو البريد..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        className="px-4 py-2 rounded-lg bg-input border border-border/50 outline-none text-foreground focus:ring-2 focus:ring-primary/50 transition-all"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="all">كل الحجوزات</option>
                        <option value="iftar">فطار</option>
                        <option value="suhoor">سحور</option>
                    </select>

                    <button
                        onClick={() => downloadCSV(filteredBookings)}
                        className="btn-primary !rounded-lg !py-2 !px-4 flex items-center gap-2 whitespace-nowrap text-sm"
                    >
                        <Download className="w-4 h-4" />
                        تصدير CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-border/50 glass-card">
                <table className="w-full text-right">
                    <thead className="bg-muted/20 text-muted-foreground border-b border-border/40">
                        <tr>
                            <th className="p-4 font-medium">#</th>
                            <th className="p-4 font-medium">العميل</th>
                            <th className="p-4 font-medium">النوع</th>
                            <th className="p-4 font-medium">التاريخ</th>
                            <th className="p-4 font-medium">الأشخاص</th>
                            <th className="p-4 font-medium">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {filteredBookings.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                    لا توجد حجوزات مطابقة
                                </td>
                            </tr>
                        ) : (
                            filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="p-4 text-muted-foreground">{booking.id}</td>
                                    <td className="p-4">
                                        <div className="font-semibold text-foreground">{booking.name}</div>
                                        <div className="text-sm text-muted-foreground" dir="ltr">{booking.phone}</div>
                                        <div className="text-xs text-muted-foreground truncate max-w-[150px]" dir="ltr">{booking.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.type === 'iftar'
                                            ? 'bg-primary/15 text-primary border border-primary/30'
                                            : 'bg-secondary/15 text-secondary border border-secondary/30'
                                            }`}>
                                            {booking.type === 'iftar' ? 'فطار' : 'سحور'}
                                        </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-foreground">
                                        {format(new Date(booking.date), "dd MMM yyyy", { locale: arEG })}
                                    </td>
                                    <td className="p-4 text-foreground">{booking.persons}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-900/30 text-green-400 border border-green-500/30">
                                            مؤكد
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-center text-sm text-muted-foreground">
                إجمالي النتائج: {filteredBookings.length}
            </div>
        </div>
    );
}
